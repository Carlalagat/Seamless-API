# Contributing to Seamless

Thank you for your interest in contributing to the Seamless project! This document provides guidelines and workflows to ensure a smooth collaboration process for all team members.

## Code of Conduct

All contributors are expected to adhere to our project's code of conduct. Please treat all team members with respect and maintain a positive, constructive approach to collaboration.

## Code Standards

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and the project-specific ESLint rules
- Write clear, self-documented code with appropriate comments
- Use JSDoc for documenting functions and classes
- Use DTOs for data validation and transformation
- Follow naming conventions:
  - Use camelCase for variables, functions, and methods
  - Use PascalCase for classes and components
  - Use UPPER_SNAKE_CASE for constants

## Folder Structure & Responsibilities

- **src/controllers/**: Contains the business logic. When updating API behavior, modify these files.
- **src/dto/**: Define and update DTOs for incoming and outgoing data.
- **src/helpers/**: Add reusable functions and enums.
- **src/routes/**: Modify or add new endpoints here.
- **tests/**: Add tests for any new feature or endpoint.
- **docs/**: Update system documentation as necessary.

## Development Workflow

### 1. Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork to your local machine
3. Install dependencies with `npm install`
4. Set up your local `.env` file based on the `.env.example`
5. Run database migrations with `npm run prisma:migrate`
6. Seed the database with test data using `npm run prisma:seed`
7. Start the development server with `npm run dev`

### 2. Branching Strategy

- The `main` branch is our production-ready code
- The `develop` branch is our integration branch for features
- Feature branches should be created from `develop` and follow the naming convention:
  - `feature/feature-name`
  - `bugfix/issue-description`
  - `hotfix/critical-issue`

Example:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication
```

### 3. Pull Request Process

1. Ensure all tests pass locally before submitting a pull request
2. Update documentation if your changes modify the behavior of existing features
3. Each pull request must be reviewed by at least one other team member
4. Address any feedback provided during code review
5. Once approved, your changes will be merged into the `develop` branch

### 4. Commit Guidelines

- Write clear, concise commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issue numbers in commit messages when applicable
- Keep commits focused on a single responsibility

Example:
```
feat: Add user measurement validation

- Implement input validation for user measurements
- Add helpful error messages for incorrect inputs
- Relates to #42
```

## Testing Guidelines

- Write unit tests for all new features
- Ensure all tests pass before submitting a pull request
- Aim for at least 80% code coverage
- Write integration tests for critical paths in the application

Run tests with:
```bash
npm run test
```

## Documentation

- Update the `README.md` file if you're changing any setup or installation steps
- Document new features in the appropriate section of the docs folder
- For architectural changes, update the `docs/architecture.md` file
- Add inline documentation for complex code sections

## Communication

- Use the project's Slack channel for quick questions and real-time discussions
- Schedule regular stand-ups to update the team on progress
- Use GitHub Issues for bug reports and feature requests
- Document any architectural decisions in the `docs/architecture.md` file

## Continuous Integration

Our project uses GitHub Actions for CI/CD. The pipeline automatically:
- Runs linting checks
- Executes all tests
- Builds the application

Ensure that your changes pass all CI checks before requesting a review.

## Database Changes

When making changes to the database schema:
1. Update the `prisma/schema.prisma` file
2. Create a migration with `npm run prisma:migrate:dev -- --name descriptive-migration-name`
3. Update any affected seed data in `prisma/seed/seed.js`
4. Document the changes in `docs/architecture.md`

## Release Process

1. Features are accumulated in the `develop` branch
2. When ready for release, a release branch is created from `develop`
3. Final testing and bug fixes happen in the release branch
4. Once stable, the release branch is merged into `main` and tagged with a version number
5. `main` is then merged back into `develop`

## Getting Help

If you need assistance:
- Check the documentation in the `docs` folder
- Reach out in the project's Slack channel
- Contact the project maintainers directly

Thank you for contributing to Seamless! Together, we're transforming the custom tailoring industry.

---

© 2025 Lish AI Labs - All Rights Reserved
