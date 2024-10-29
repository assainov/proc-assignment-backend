/\*

# Procurified Interview Assignment - Backend

A caching engine abstracting away Star Wars API - search people endpoint.


## Technologies Used:

- **Express for web framework**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Postgres for database**: A powerful, open-source object-relational database system with over 30 years of active development.
- **TypeORM for ORM**: An ORM (Object-Relational Mapper) for TypeScript and JavaScript (ES7, ES6, ES5) that supports many database systems.
- **SWAPI as a 3rd party API engine**: The Star Wars API, which provides data about the Star Wars universe, including people, planets, films, species, vehicles, and starships.
- **Jest for unit testing**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **ESLint + Prettier for code linting**: ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, while Prettier is an opinionated code formatter.
- **Pino for logging**: A low overhead logging library for Node.js applications.


## Prerequisites

- Must have Node version 20 (LTS) - use `nvm` to switch versions
- Postgres database installed on your machine. Check the dump file `pg_dump.sql` in the root for restoration, or use migration scripts below.
- Make sure to check `.env.example` file, rename it to `.env`, and specify your variables.


## Getting Started

1. **Install dependencies**:
  ```bash
  npm install
  ```

2. **(Optional) Restore the DB backup file**:
  
  ```bash
  using pgAdmin, restore the database to map to the .env variables
  ```

3. **(Optional) Alternatively, migrate with the script**:
  ```bash
  npm run typeorm:migrate
  ```

4. **Run tests to ensure everything is working**:
  ```bash
  npm test
  ```

5. **Start the application**:
  ```bash
  npm start
  ```
6. **(Optional) Changing the caching interval**:
  Change the `CACHED_TIME_MINUTES` to test different cache validity times.

  ## Project Structure
  The idea behind the project structure is to be able to extend the codebase into a large project. Mainly, there are two types of files: automatic config files, which you don't really need to think twice about once you get used to them, and the core logic files, which enable you to think about the business logic. Configuration files are less testable, while business logic files are highly testable.

  All source code is located in the `src` directory, which is divided into the following subdirectories:

  ```
  src
  ├── api
  ├    └── features
  ├           ├── auth
  ├           └── search
  ├── domain
  └── infrastructure
  ```

  - **api**: Contains web server-specific code as well as the entry point.
  - **api > features**: Contains a feature specific set of routes, controllers as well as the business logic - a highly testable code orchestrating the core use cases.
  - **domain**: Application entities. This code grows with domain-driven design and deeper business logic. As we're running a cache server, there isn't much now.
  - **infrastructure**: Contains the implementation details, such as database connections, external API integrations, and other services.

  This structure ensures that the project remains organized and scalable as it grows.