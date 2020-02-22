const chalk = require('chalk');
const CLI = require('clui');
const fs = require('fs');
const git = require('simple-git/promise')();
const touch = require("touch");
const _ = require('lodash');

const inquirer = require('./inquirer');
const files = require('./files');

const DEFAULT_BASE_BRANCHES = ["dev", "develop", "development", "master"]

module.exports = {
  init: async () => {
    // TODO: Implement
    // const answers = await inquirer.askRepoDetails();

    // TODO: Implement
    // this.createGitignore();

    // TODO: Get spinner to work
    const spinner = new CLI.Spinner('Initializing local repository and pushing to remote...');
    spinner.start();

    try {
      setTimeout(() => { }, 3000); // TODO: Remove this line.

      // git.init()
      //   .then(git.add('.gitignore'))
      //   .then(git.add('./*'))
      //   .then(git.commit('Initial commit'))
      //   .then(git.addRemote('origin', url))
      //   .then(git.push('origin', currentBranch()));
    } finally {
      spinner.stop();
    }
  },

  isInitialized: () => {
    return files.directoryExists('.git')
  },

  createGitignore: async () => {
    const files = _.without(fs.readdirSync('.'), '.git', '.gitignore');
    let answers

    if (files.length) {
      answers = await inquirer.askIgnoreFiles(files);
      if (answers.ignore.length) {
        fs.writeFileSync('.gitignore', answers.ignore.join('\n'));
      }
    }
    touch('.gitignore');
  },

  hasGitignoreFile: () => {
    return files.directoryExists('.gitignore')
  },

  currentBranch: () => {
    // TODO: Implement ["git", "rev-parse", "--abbrev-ref", "HEAD"]
  },

  defaultBaseBranch: () => {
    // for branch in DEFAULT_BASE_BRANCHES:
    //     if branch_exists(branch):
    //         return branch
  },

  branchExists: (branch) => {
    // try:
    //     subprocess.check_call(
    //         ["git", "rev-parse", "--quiet", "--verify", branch],
    //         stdout=subprocess.DEVNULL,
    //     )
    //     return True
    // except subprocess.CalledProcessError:
    //     return False
  },

  createBranch: (baseBranch, newBranch) => {
    // subprocess.call(["git", "checkout", baseBranch])
    // subprocess.call(["git", "pull"])
    // subprocess.call(["git", "checkout", "-b", newBranch])
  },

  rebase: (baseBranch) => {
    // subprocess.call(["git", "checkout", baseBranch])
    // subprocess.call(["git", "pull"])
    // subprocess.call(["git", "checkout", "-"])
    // subprocess.call(["git", "rebase", "-i", baseBranch])
  },

  commitAll: (message) => {
    // execute.call(["git", "add", "."], abort=False)
    // execute.call(f'git commit -m "{message}"', abort=False, shell=True)
  },
};
