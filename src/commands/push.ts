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
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'change name of remote repository' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
    public: flags.boolean({ char: 'p' })
  }

  static args = [{ name: 'repository' }, { name: "message" }]

  async run() {
    const { args, flags } = this.parse(Push)

    const config: Configuration = FileUtil.readJsonFileSync(Config.readConfigFilePath());
    const git: GitService = GitService.getInstance();
    /* if you're so lazy to give type . or directory 
    but you want to add the commit message(second argumant),but make sure that's
    the commit message doesn't conflict with any folder with the same name
  */
    if (!args.repository || (!FileUtil.exists(args.repository) && !args.message)) {

      if (!FileUtil.exists(args.repository) && !args.message)
        args.message = args.repository;
      args.repository = '.';
    }
    let project = new Project();
    project.path = path.resolve(args.repository);
    project.commitMessage = args.message ?? config.default_commit_message;
    project.name = flags.name ?? path.basename(project.path);
    this.log(`project name: ${project.name} commit-message: ${project.commitMessage} path:${project.path}`)
    if (!git.isInit(project))
      this.log(git.init(project));
    if (git.isClean(project))
      this.warn("this repository is empty");
    else {
      this.log(git.add(project));
      this.log(git.commit(project));
    }
    let remote = git.getRemote(project);
    if (StringUtil.isEmpty(remote)) {
      project.isPushedBefore = false;
      let github: GithubService = GithubService.getInstance();
      if (!config.token) {
        if (!config.username)
          config.username = require("os").userInfo().username;
        this.error('well what the hell I am supposed to do without your github token,' + config.username + " you ignorant slut");
      } else {
        project.remote_url = await github.createRepo(project, config.token);
        this.log(git.addRemote(project));
      }

    } else {
      project.isPushedBefore = true;
    }
    if (project.remote_url || project.isPushedBefore)
      this.log(git.push(project));
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
