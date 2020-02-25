const chalk = require('chalk'); // https://github.com/chalk/chalk
const figlet = require('figlet');
const program = require('commander'); // https://github.com/tj/commander.js

const pkg = require('./package.json');
const handle = require('./lib/handle');

program
  .name(pkg.name)
  .version(pkg.version)
  .option('-d, --debug', 'output extra debugging');

program
  .command('init')
  .description('Initialize local repository and push to remote')
  .action(handle.init);

program
  .command('branch <issueId>')
  .description('Create a branch using issue ID and title')
  .option('-b, --base-branch, <baseBranch>', 'The base branch to perform this action on')
  .action(handle.branch);

program
  .command('commit')
  .description('Create a commit and push to GitHub')
  .option('--id, --issue-id, <issueId>', 'The ID of the issue being worked on')
  .option('-m, --message, <message>', 'The commit message')
  .option('--no-push', "Don't push the changes to origin")
  .action(handle.commit);

program
  .command('pr')
  .description('Create a GitHub Pull Request for the specified branch')
  .option('-b, --base-branch, <baseBranch>', 'The base branch to perform this action on')
  .action(handle.pr);

program
  .command('open')
  .description('Open the issue in the default browser')
  .action(handle.open);

program
  .command('*')
  .action(() => program.help());

program.parse(process.argv);

if (program.debug) {
  console.log(program.opts());
}

if (!process.argv.slice(2).length) {
  console.log(
    chalk.yellow(
      figlet.textSync(pkg.name, { horizontalLayout: 'full' })
    ),
  );
  console.log()
  program.help();
}
