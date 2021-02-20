import { Command, flags } from '@oclif/command'
import { Configuration } from '../core/models/configuration';
import { Project } from '../core/models/project';
import * as FileUtil from '../core/utils/file-util';
import * as StringUtil from '../core/utils/string-util';

import * as path from 'path';
import Config from './config';
import { GitService } from '../core/services/git.service';
import { GithubService } from '../core/services/github.service';
export default class Push extends Command {
  static description = "Automate the process of pushing/creating the code to github repository"

  static flags = {
    help: flags.help({ char: 'h' }),
    public: flags.boolean({ char: 'p', description: 'create public repository' }),
    name: flags.string({ char: 'n', description: 'change name of remote repository' }),
    license: flags.boolean({ char: 'l', description: 'add license' }),
    readme: flags.boolean({ char: 'r', description: 'add readme' }),
    gitignore: flags.boolean({ char: 'g', description: 'add gitignore' })
  }

  static args = [{ name: 'directory' }, { name: "message" }]

  async run() {
    const { args, flags } = this.parse(Push)

    const config: Configuration = FileUtil.readJsonFileSync(Config.readConfigFilePath());
    const git: GitService = GitService.getInstance();
    /* if you're too lazy to type . or the name of the directory ,
     you can add only the commit message(second argumant),but make sure that's
    the commit message doesn't conflict with any directory with the same name
  */
    if (!args.directory || (!FileUtil.exists(args.directory) && !args.message)) {
      // decide if the first argumant is the directory or a commit message
      if (!FileUtil.exists(args.directory) && !args.message)
        args.message = args.directory;
      args.directory = '.';
    }
    // override configuruation with flags
    if (flags.public)
      config.always_private = false;
    if (flags.gitignore)
      config.always_add_gitignore = true;
    if (flags.license)
      config.always_add_license = true;
    if (flags.readme)
      config.always_add_readme = true;

    let project = new Project();
    project.path = path.resolve(args.directory);
    project.commitMessage = args.message ?? config.default_commit_message;
    project.IsPrivate = config.always_private;
    project.name = flags.name ?? path.basename(project.path);
    this.log(`project name: ${project.name} commit-message: ${project.commitMessage} path:${project.path}`)
    let ready: boolean = await this.perpare(project, config)
    if (ready)
      git.push(project);

  }
  async perpare(project: Project, configuration: Configuration): Promise<boolean> {
    let git = GitService.getInstance();
    if (!git.isInit(project))
      git.init(project);

    // Add Readme and LICENSE ..
    this.addFiles(project, configuration);

    if (!git.isClean(project)) {
      git.add(project);
      this.log(git.commit(project));
    }
    let remote = git.getRemote(project);
    if (StringUtil.isEmpty(remote)) {
      let github = GithubService.getInstance();
      if (!configuration.token) {
        if (!configuration.username)
          configuration.username = require("os").userInfo().username;
        this.error('well what the hell I am supposed to do without your github token,'
          + configuration.username + " you ignorant slut");
      }
      project.remote_url = await github.createRepo(project, configuration.token);
      if (!project.remote_url)
        return false;
      else
        git.addRemote(project);
    }
    return true;
  }

  addFiles(project: Project, configuration: Configuration) {
    const resourcesPath = path.join(__dirname, "..", "resources");
    if (configuration.always_add_readme && !FileUtil.existsInFolder(project.path, "README.md"))
      FileUtil.createFile("README.md", "# " + project.name, project.path);
    if (configuration.always_add_gitignore && !FileUtil.existsInFolder(project.path, ".gitignore"))
      FileUtil.copy(path.join(resourcesPath, ".gitignore"), path.join(project.path, ".gitignore"));
    if (configuration.always_add_license && !FileUtil.existsInFolder(project.path, "LICENSE"))
      FileUtil.copy(path.join(resourcesPath, "LICENSE"), path.join(project.path, "LICENSE"));
  }
}
