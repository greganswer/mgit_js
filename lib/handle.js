const chalk = require('chalk');
const Listr = require('listr')
const { Observable } = require('rxjs');

const github = require('./github');
const repo = require('./repo');

module.exports = {
  init: async (options) => {
    const tasks = new Listr(
      [
        {
          title: ' Create .gitignore',
          skip: () => {
            if (repo.hasGitignoreFile()) return '.gitignore file present'
          },
          task: () => { }
        },
        {
          title: ' Initialize Git repo',
          skip: () => {
            if (repo.isInitialized()) return 'Repo already initialized'
          },
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

  branch: (issueId, options) => {

  },

  commit: (options) => {

  },

  pr: (options) => {

  },

  open: (options) => {

  },

}