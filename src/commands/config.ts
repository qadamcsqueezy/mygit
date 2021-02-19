import { Command, flags } from '@oclif/command'
import * as fs from 'fs';
import * as StringUtil from '../core/utils/string-util';
import * as path from 'path';
import { string } from '@oclif/command/lib/flags';
export default class Config extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    force: flags.boolean({ char: 'f', description: 'force to change configuration file path' }),
  }

  static args = [{ name: 'path', required: true, description: 'absolute path to the configuration file' }]

  async run() {
    const { args, flags } = this.parse(Config)

    if (!StringUtil.isEmpty(args.path)) {

      let config: string = Config.readConfigFilePath();
      if (!config && config == "") {
        args.path = args.path.trim();
        Config.writeConfigFilePath(args.path);
        this.exit(1);
      } else if (flags.force) {
        Config.writeConfigFilePath(args.path);
        this.exit(1);
      }

    }


  }

  static readConfigFilePath(): string {

    let filePath = path.join(__dirname, '..', 'config', 'config');

    let config = fs.readFileSync(filePath).toString();
    return config;
  }
  static writeConfigFilePath(data: string) {
    let filePath = path.join(__dirname, '..', 'config', 'config');
    fs.writeFileSync(filePath, data);
  }
}
