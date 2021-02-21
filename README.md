# mygit

Create github repositories and Automate git bash commands from command line

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mygit.svg)](https://npmjs.org/package/mygit)
[![Downloads/week](https://img.shields.io/npm/dw/mygit.svg)](https://npmjs.org/package/mygit)
[![License](https://img.shields.io/npm/l/mygit.svg)](https://github.com/QADA99/mygit/blob/master/package.json)

<!-- toc -->

- [Motivation](#motivation)
- [Feature](#feature)
- [Requirements](#rerquirements)
- [Usage](#usage)
- [Commands](#commands)
- [Errors](#errors)
- [License](#license)
<!-- tocstop -->

<!-- motivation -->

# Motivation

Sometimes you just want to put your local directory in github without going to the browser .

> _"So me think why wast time do lot commands, when one command do trick"_ - kevin from the office

<!-- motivationstop -->

# Feature

<!-- feature -->

The following are the key features of Mygit in a nutshell:

- Create a new repository on GitHub from the Command
- Automate Git commands
- Automatically add README.md, LICENSE, .gitignore
<!-- featurestop -->

# Requirements

<!-- rerquirements -->

- [**Node.js** `v8`](https://nodejs.org/en/download/) or higher must be installed to run this program
- [**git**](https://git-scm.com/downloads) must be installed to run git commands

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

Set the location of the configuration file

```
USAGE
  $ mygit config [PATH]

OPTIONS
  -f, --force     force to change the configuration file path
  -h, --help       show CLI help
```

In order to put your project up on GitHub , you need to provide the configuration file with your github's Personal access tokens with at least public_repo scope or repo scope . Read more about github tokens and how to create one [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) .

Here's an example of a configuration file :

```json
{
  "token": "Put your token here",
  "username": "QADA99",
  "IsPrivate": true,
  "default_commit_message": "pippity poppity give me the zoppity",
  "always_add_readme": true,
  "always_add_license": false,
  "always_add_gitignore": false
}
```

Make sure to put it somewhere safe then run

```
 $ mygit config pathToTheFile -f

```

Your token is only used to communicate with github Api . to make the request I used this Amazing Extendable client for GitHub's REST [Octokit](https://github.com/octokit/core.js) .

_See code: [src/core/services/github.service.ts](https://github.com/QADA99/mygit/blob/master/src/core/services/github.service.ts)_

The Image below shows how mygit works :

![alt text](./mygit.png?raw=true)

_See code: [src/commands/config.ts](https://github.com/QADA99/mygit/blob/master/src/commands/config.ts)_

## `mygit push [DIRECTORY] [MESSAGE]`

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

Both arguments ( DIRECTORY and MESSAGE ) are optional .

```
Example 1
  $ mygit push my-directory "inital commit"
```

In this example mygit will check if there's a directory with the same name (if not it will create one) and run the fallowing git commands in my-directory

```sh-session
$ git init # if my-directory is not a Git repository
$ git add .
$ git commit "intial commit"
```

Afterwards mygit will check if git remote exists before push , if not it will create a Repository in Github with the same name of your directory. the visibility of the new Repository depends on your configuration and if you specified -p flag, -p stands for public.

After that mygit will run git push . the sequence of those operations depend on your configuration and if you used flags (-r , -g , -l) .

```
Example 2
  $ mygit push . "inital commit"
```

To run mygit in the current repository just type . , or type only the commit message or don't type at all :

```
Example 3
  $ mygit push 'initial commit'
```

In this example mygit will take the current directory as the working directory. but make sure that there's no directory with the name of your message . otherwise it will be taken as the working directory and the commit message will be the default message.

```
Example 4
  $ mygit push
```

If you run mygit without arguments , it will take the current directory as the working directory and the default commit message from the configuration file.

```
Example 5
  $ mygit push my-directory
```

If no message is provided . mygit will take the default commit message from the configuration file.

_See code: [src/commands/push.ts](https://github.com/QADA99/mygit/blob/master/src/commands/push.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/master/src/commands/help.ts)_

<!-- commandsstop -->
<!-- errors -->

# Errors

If something goes wrong just try to pretend like none of it happened and use git or install the official [github cli](https://cli.github.com/) , remember this tool was not designed to replace git in any way, it's just to gain some extra time so you can do whatever you can do in 2 seconds .

<!-- errorsstop>
<!-- errors -->

# License

Do whatever you want

[MIT](LICENSE)

<!-- errorsstop>
