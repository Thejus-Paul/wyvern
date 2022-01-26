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
APP_PORT=8000
DB_USERNAME=root
DB_PASSWORD=password
DB_CLUSTER_URL=something.my.mongodb.net
DB_NAME=mydatabase
```
2. Run `deno run --allow-net --allow-env --allow-read src/server.ts --port=8000`

### Docker

1. Build docker with command: `docker build -t app .`
2. Run docker with command: `docker run -it --init -p 8000:8000 app`
3. Go to `http://localhost:8000/api/v1/dramas`
