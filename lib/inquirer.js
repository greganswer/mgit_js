const inquirer = require('inquirer'); // https://github.com/SBoudrias/Inquirer.js
const util = require('util');
const chalk = require('chalk')

const files = require('./files');

module.exports = {
  askGithubCredentials: () => inquirer.prompt([
    {
      name: 'username',
      type: 'input',
      message: 'Enter your GitHub username or e-mail address:',
      validate: function (value) {
        return value.length ? true : 'Please enter your username or e-mail address.';
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function (value) {
        return value.length ? true : 'Please enter your password.';
      }
    }
  ]),

  getTwoFactorAuthenticationCode: () => inquirer.prompt({
    name: 'twoFactorAuthenticationCode',
    type: 'input',
    message: 'Enter your two-factor authentication code:',
    validate: function (value) {
      return value.length ? true : 'Please enter your two-factor authentication code.';
    }
  }),

  askRepoDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function (value) {
          return value.length ? true : 'Please enter a name for the repository.';
        }
      },
      {
        type: 'input',
        name: 'description',
        default: argv._[1] || null,
        message: 'Optionally enter a description of the repository:'
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or private:',
        choices: ['public', 'private'],
        default: 'public'
      }
    ];
    return inquirer.prompt(questions);
  },

  askIgnoreFiles: (files) => inquirer.prompt({
    name: 'ignore',
    type: 'checkbox',
    choices: files,
    default: ['node_modules', 'bower_components'],
    message: 'Select the files and/or folders you wish to ignore:',
  }),

  askCreateBranch: (baseBranch, newBranch) => inquirer.prompt({
    name: 'createBranch',
    type: 'confirm',
    message: util.format(
      'Create the %s branch off of the %s branch?',
      chalk.green(newBranch),
      chalk.green(baseBranch)
    )
  }),

  askCreateCommit: (commitMessage) => inquirer.prompt({
    name: 'createCommit',
    type: 'confirm',
    message: util.format(
      'Create a commit with the message "%s"',
      chalk.green(commitMessage),
    )
  }),

  askRebase: (baseBranch) => inquirer.prompt({
    name: 'rebase',
    type: 'confirm',
    message: util.format(
      'Update the %s branch and rebase?',
      chalk.green(baseBranch)
    )
  }),
};
