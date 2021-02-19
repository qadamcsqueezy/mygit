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
$ npm install -g mygit
$ mygit COMMAND
running command...
$ mygit (-v|--version|version)
mygit/0.0.0 win32-x64 node-v14.15.1
$ mygit --help [COMMAND]
USAGE
  $ mygit COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`mygit config [FILE]`](#mygit-config-file)
- [`mygit hello [FILE]`](#mygit-hello-file)
- [`mygit help [COMMAND]`](#mygit-help-command)
- [`mygit push [FILE]`](#mygit-push-file)

## `mygit config [FILE]`

describe the command here

```
USAGE
  $ mygit config [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/config.ts](https://github.com/QADA99/mygit/blob/v0.0.0/src/commands/config.ts)_

## `mygit hello [FILE]`

describe the command here

```
USAGE
  $ mygit hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ mygit hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/QADA99/mygit/blob/v0.0.0/src/commands/hello.ts)_

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

## `mygit push [FILE]`

describe the command here

```
USAGE
  $ mygit push [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
  -p, --public
```

_See code: [src/commands/push.ts](https://github.com/QADA99/mygit/blob/v0.0.0/src/commands/push.ts)_

<!-- commandsstop -->
