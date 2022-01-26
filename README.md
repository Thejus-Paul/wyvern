# wyvern

[![Build Status](https://github.com/thejus-paul/wyvern/workflows/CodeQL/badge.svg?branch=master)](https://github.com/thejus-paul/wyvern/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/64a21b4dfdeafef7598f/maintainability)](https://codeclimate.com/github/Thejus-Paul/wyvern/maintainability)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/5569/badge)](https://bestpractices.coreinfrastructure.org/projects/5569)

A deno implementation of DraMa Spy backend server.

## Setup

### Docker

1. Build docker with command: `docker build -t app .`
2. Run docker with command: `docker run -it --init -p 8000:8000 app`
3. Go to `http://localhost:8000/api/v1/dramas`
