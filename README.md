# mygit

create github repositories and automate git bash commands

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mygit.svg)](https://npmjs.org/package/mygit)
[![Downloads/week](https://img.shields.io/npm/dw/mygit.svg)](https://npmjs.org/package/mygit)
[![License](https://img.shields.io/npm/l/mygit.svg)](https://github.com/QADA99/mygit/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ git clone https://github.com/QADA99/mygit.git
$ cd mygit && npm install
$ npm link #this will allow you to use mygit globaly
$ mygit COMMAND
running command...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`mygit config [PATH]`](#mygit-config-file)
- [`mygit push [DIRECTORY] [MESSAGE]`](#mygit-push-file)
- [`mygit help [COMMAND]`](#mygit-help-command)

## `mygit config [PATH]`

set the location of configuration file

```
USAGE
  $ mygit config [PATH]

OPTIONS
  -f, --force     f orce to change the configuration file path
  -h, --help       show CLI help
```

_See code: [src/commands/config.ts](https://github.com/QADA99/mygit/blob/v0.0.0/src/commands/config.ts)_

## `mygit push [FILE]`

Automate the process of pushing/creating the code to github repository

```
USAGE
  $ mygit push [DIRECTORY] [MESSAGE]

OPTIONS
  -g, --gitignore  add gitignore
  -h, --help       show CLI help
  -l, --license    add license
  -n, --name=name  change name of remote repository
  -p, --public     create public repository
  -r, --readme     add readme
```

_See code: [src/commands/push.ts](https://github.com/QADA99/mygit/blob/v0.0.0/src/commands/push.ts)_

## `mygit help [COMMAND]`

display help for mygit

```
USAGE
  $ mygit help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

<!-- commandsstop -->
