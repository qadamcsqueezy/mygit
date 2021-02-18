import { Command, flags } from '@oclif/command'
import { Octokit } from "@octokit/core";
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
    this.log(`hello ${name} from C:\\Users\\pc\\mygit\\src\\commands\\push.ts` + args.public);
    this.log("mamiya");

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
