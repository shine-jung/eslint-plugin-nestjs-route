# Contributing to eslint-plugin-nestjs-route

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## How to Contribute

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/eslint-plugin-nestjs-route.git
cd eslint-plugin-nestjs-route

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Build the project
npm run build
```

## Testing

We use Jest for testing. Please ensure that:

- All existing tests pass
- New functionality includes appropriate tests
- Test coverage remains high (>85%)

Run tests with:

```bash
npm test
npm run test:coverage
```

## Code Style

- We use ESLint and TypeScript
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

## Adding New Rules

When adding a new ESLint rule:

1. Create the rule file in `src/rules/`
2. Add comprehensive tests in `tests/`
3. Update the main `src/index.ts` file
4. Update documentation in `README.md`
5. Add examples in the documentation

## Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by opening a new issue using the bug report template.

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
- Be specific!
- Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

## Feature Requests

We use GitHub issues to track feature requests. Request a feature by opening a new issue using the feature request template.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue with your question, or reach out to the maintainers.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Unacceptable Behavior

Examples of unacceptable behavior include:

- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

Thank you for contributing! 🎉
