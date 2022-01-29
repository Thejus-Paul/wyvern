# wyvern

[![Build Status](https://github.com/thejus-paul/wyvern/workflows/CodeQL/badge.svg?branch=master)](https://github.com/thejus-paul/wyvern/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/64a21b4dfdeafef7598f/maintainability)](https://codeclimate.com/github/Thejus-Paul/wyvern/maintainability)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/5569/badge)](https://bestpractices.coreinfrastructure.org/projects/5569)

A deno implementation of DraMa Spy backend server.

## Setup

### Local Machine

1. Add a `.env` file with the corresponding details from your MongoDB cluster:

```
APP_HOST=0.0.0.0
APP_PORT=8100
DB_USERNAME=root
DB_PASSWORD=password
DB_CLUSTER_URL=something.my.mongodb.net
DB_NAME=mydatabase
```

2. Run `deno run --allow-net --allow-env --allow-read src/server.ts --port=8100`

### Docker

1. Build docker with command below and remove the `platform` if you are using x86 processor.
   `docker build --platform=linux/arm64/v8 -t wyvern .`
2. Run docker with command: `docker run -it --init -p 8100:8100 wyvern`.
3. Go to `http://localhost:8100/api/v1/dramas`.

## Authors

[Thejus Paul](https://github.com/Thejus-Paul)

See also the list of [contributors](https://github.com/thejus-paul/wyvern/graphs/contributors) who participated in this project.
