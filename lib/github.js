const CLI = require('clui');
const Configstore = require('configstore');
const Octokit = require('@octokit/rest');
const { createBasicAuth } = require("@octokit/auth-basic");

const inquirer = require('./inquirer');
const pkg = require('../package.json');

const conf = new Configstore(pkg.name);

let octokit;

module.exports = {
  getInstance: () => {
    return octokit;
  },

  getToken: () => {
    return conf.get('github.token');
  },

  auth: (token) => {
    octokit = new Octokit({ auth: token });
  },

  getNewAccessToken: async () => {
    const credentials = await inquirer.askGithubCredentials();
    const spinner = new CLI.Spinner('Authenticating you, please wait...');

    spinner.start();

    const auth = createBasicAuth({
      username: credentials.username,
      password: credentials.password,
      async on2Fa() {
        spinner.stop();
        const res = await inquirer.getTwoFactorAuthenticationCode();
        spinner.start();
        return res.twoFactorAuthenticationCode;
      },
      token: {
        scopes: ['user', 'public_repo', 'repo', 'repo:spinner'],
        note: `${pkg.name}: ${pkg.description}`
      }
    });

    try {
      const res = await auth();

      if (res.token) {
        conf.set('github.token', res.token);
        return res.token;
      } else {
        throw new Error("GitHub token was not found in the response");
      }
    } finally {
      spinner.stop();
    }
  },

  assignee: () => {
    return conf.get('github.assignee');
  },

  cliInstalled: () => {
    // shutil.which("hub")
  },

  pullRequest: () => {
    const spinner = new CLI.Spinner('Creating pull request, please wait...');
    spinner.start()
    setTimeout(() => { }, 1000); // TODO: Remove this line.
    //  'hub pull-request -fpo -b {base_branch} -m "{body}" -a {assignee()}'
    spinner.stop()
  }
};
