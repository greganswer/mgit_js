const chalk = require('chalk'); // https://github.com/chalk/chalk
const Listr = require('listr'); // https://github.com/SamVerschueren/listr
const { Observable } = require('rxjs');

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
    const newBranch = 'new-branch' // TODO: Get the branch name based on the issue
    const baseBranch = options.baseBranch || repo.defaultBaseBranch()
    const res = await inquirer.askCreateBranch(baseBranch, newBranch);
    if (!res.createBranch) {
      process.exit(1);
    }
    console.log('%s Branch created', chalk.green.bold('DONE'));
  },

  commit: async (options) => {
    console.log('%s Commit created', chalk.green.bold('DONE'));
  },

  pr: async (options) => {
    console.log('%s Pull request created', chalk.green.bold('DONE'));

  },

  open: async (options) => {
    console.log('Opening issue...');
  },

}