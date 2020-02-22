const CLI = require('clui');
const fs = require('fs');
const git = require('simple-git/promise')();
const touch = require("touch");
const _ = require('lodash');

const inquirer = require('./inquirer');

const DEFAULT_BASE_BRANCHES = ["dev", "develop", "development", "master"]

module.exports = {
  init: async (url) => {
    const spinner = new CLI.Spinner('Initializing local repository and pushing to remote...');
    spinner.start();

    try {
      git.init()
        .then(git.add('.gitignore'))
        .then(git.add('./*'))
        .then(git.commit('Initial commit'))
        .then(git.addRemote('origin', url))
        .then(git.push('origin', currentBranch()));
    } finally {
      spinner.stop();
    }
  },

  isInitialized: () => {
    // os.path.isdir(".git")
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

  currentBranch: () => {
    // TODO: Implement ["git", "rev-parse", "--abbrev-ref", "HEAD"]
  },

  default_base_branch: () => {
    // for branch in DEFAULT_BASE_BRANCHES:
    //     if branch_exists(branch):
    //         return branch
  },

  branch_exists: (branch) => {
    // try:
    //     subprocess.check_call(
    //         ["git", "rev-parse", "--quiet", "--verify", branch],
    //         stdout=subprocess.DEVNULL,
    //     )
    //     return True
    // except subprocess.CalledProcessError:
    //     return False
  },

  create_branch: (base_branch, new_branch) => {
    // subprocess.call(["git", "checkout", base_branch])
    // subprocess.call(["git", "pull"])
    // subprocess.call(["git", "checkout", "-b", new_branch])
  },

  rebase: (base_branch) => {
    // subprocess.call(["git", "checkout", base_branch])
    // subprocess.call(["git", "pull"])
    // subprocess.call(["git", "checkout", "-"])
    // subprocess.call(["git", "rebase", "-i", base_branch])
  },

  commit_all: (message) => {
    // execute.call(["git", "add", "."], abort=False)
    // execute.call(f'git commit -m "{message}"', abort=False, shell=True)
  },
};
