const chalk = require('chalk'); // https://github.com/chalk/chalk
const Listr = require('listr'); // https://github.com/SamVerschueren/listr
const { Observable } = require('rxjs');
const git = require('simple-git/promise')(); // https://github.com/steveukx/git-js
const open = require('open'); // https://github.com/sindresorhus/open

const github = require('./github');
const repo = require('./repo');
const inquirer = require('./inquirer');


module.exports = {
  init: async (options) => {
    const tasks = new Listr(
      [
        {
          title: ' Create .gitignore',
          skip: () => repo.hasGitignoreFile() ? '.gitignore file present' : false,
          task: () => { }
        },
        {
          title: ' Initialize Git repo',
          skip: () => repo.isInitialized() ? 'Repo already initialized' : false,
          task: () => { }
        },
        {
          title: ' Add all files',
          task: () => { }
        },
        {
          title: ' Commit all files',
          task: () => { }
        },
        {
          title: ' Push to remote',
          task: () => {
            return new Observable(observer => {
              observer.next('Foo');

              setTimeout(() => {
                observer.next('Bar');
              }, 2000);

              setTimeout(() => {
                observer.complete();
              }, 4000);
            });
          }
        },
        {
          title: 'Failure',
          task: () => Promise.reject(new Error('Testing error response'))
        },
      ],
    );

    await tasks.run().catch(err => {
      if (options.parent.debug) {
        console.error(err);
      }
      process.exit(1);
    });
    console.log('%s Repo initialized', chalk.green.bold('DONE'));
  },

  branch: async (issueId, options) => {
    const newBranch = `new-branch-${issueId}` // TODO: Get the branch name based on the issue
    const baseBranch = options.baseBranch || repo.defaultBaseBranch()
    const res = await inquirer.askCreateBranch(baseBranch, newBranch);
    if (!res.createBranch) {
      console.log(chalk.red.bold('! Branch not created'));
      process.exit(1);
    }
    console.log('%s Branch created', chalk.green.bold('DONE'));
  },

  commit: async (options) => {
    const message = options.message || 'Title from issue' // TODO: Or get message from issue.
    const res = await inquirer.askCreateCommit(message);
    if (!res.createCommit) {
      console.log(chalk.red.bold('! Changes not committed'));
      process.exit(1);
    }
    const tasks = new Listr(
      [
        {
          title: ' Add all uncommitted files',
          task: () => { }
        },
        {
          title: ' Create the commit',
          task: () => { }
        },
        {
          title: ' Push the changes to origin',
          skip: () => options.push === false ? 'Skipping push' : false,
          task: () => { }
        },
      ]
    );
    await tasks.run().catch(err => {
      if (options.parent.debug) {
        console.error(err);
      }
      process.exit(1);
    });
    console.log('%s Changes committed', chalk.green.bold('DONE'));
  },

  pr: async (options) => {
    const message = options.message || 'Title from issue' // TODO: Or get message from issue.
    const baseBranch = options.baseBranch || repo.defaultBaseBranch()

    if (options.commit === undefined) {
      let res = await inquirer.askCreateCommit(message);
      options.commit = res.createCommit
    }
    if (options.rebase === undefined) {
      let res = await inquirer.askRebase(baseBranch);
      options.rebase = res.rebase
    }
    const tasks = new Listr(
      [
        {
          title: ' Add all uncommitted files',
          skip: () => options.commit === false,
          task: () => { }
        },
        {
          title: ' Create the commit',
          enabled: _ctx => options.commit !== false,
          task: () => { }
        },
        {
          title: ' Push the changes to origin',
          skip: () => options.push === false,
          task: () => { }
        },
        {
          title: ' Rebase changes on base branch',
          skip: () => options.rebase === false,
          task: () => { }
        },
        {
          title: ' Create pull request',
          task: () => {
            // TODO: if options.open === false don't set the open flag on the hub pull request command
          },
          // task: (ctx, task) => execa('yarn')
          //   .catch(() => {
          //     task.skip('hub not available. Visit https://hub.github.com`');
          //   })
        },
      ]
    );
    await tasks.run().catch(err => {
      if (options.parent.debug) {
        console.error(err);
      }
      process.exit(1);
    });
    console.log('%s Pull request created', chalk.green.bold('DONE'));
  },

  open: async (_options) => {
    console.log('Opening issue...');
    open("https://github.com/sindresorhus/open")
  },
}