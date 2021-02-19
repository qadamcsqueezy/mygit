import { Command, flags } from '@oclif/command'
import { Octokit } from "@octokit/core";
import { Configuration } from '../core/models/configuration';
import * as FileUtil from '../core/utils/file-util'
import * as fs from 'fs';
import Config from './config';
import { env } from 'process';
export default class Push extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
    public: flags.boolean({ char: 'p' })
  }

  static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(Push)

    const name = flags.name ?? 'world'

    const config: Configuration = FileUtil.readJsonFileSync(Config.readConfigFilePath());
    if (!config.token) {
      if (!config.username)
        config.username = require("os").userInfo().username;
      this.error('well what the hell I am supposed to do without your github token,' + config.username + " you ignorant slut");
    }

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
