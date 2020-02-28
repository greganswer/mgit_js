# mgit_js

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
  - [References](#references)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Code of Conduct](#code-of-conduct)

[mGit](https://github.com/greganswer/mgit) rewritten in Javascript 

## Requirements

- [Node.js](http://nodejs.org/)
- [Git](https://git-scm.com/)
- [GitHub account](https://github.com/)

## Installation

1. Clone repo
2. Run `npm install`
3. Install the module globally with `npm install -g` from within the project directory
4. Run `mgit`

## Usage

```bash
# Assuming you have a Jira ticket with the following info:
#       ID: JIR-642
#       Title: Update README file
mgit branch JIR-642
#=> jir-642-update-readme-file

mgit commit
#=> Message: JIR-642: Update Readme File

# If you make changes and run it again, it will make another commit with the
# same name
mgit commit
#=> Message: JIR-642: Update Readme File

mgit pull-request
#=> Title: JIR-642: Update Readme File

mgit tag
#=> Tag Title: my_project v2.1.7
```

## Development

### References

- https://www.sitepoint.com/javascript-command-line-interface-cli-node-js
- https://www.twilio.com/blog/how-to-build-a-cli-with-node-js

## Testing

## Contributing

Bug reports and pull requests are welcome on GitHub. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to 
the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The project is available as open source under the terms of the
[MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in this project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](/CODE_OF_CONDUCT.md).
