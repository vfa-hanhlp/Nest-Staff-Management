<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript .

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run on Docker
1. Config enviroinment value in bash_profile
2. Set "host" value in file ormconfig.json the same with dadatabse service in file docker-composer.yml
3. Run "start-local-docker" command in package.json file to start docker
4. Run "stop-local-docker" command in package.json file to stop docker
