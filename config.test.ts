import {
  assertExists,
  AssertionError,
  assertMatch,
  assertNotEquals,
  assertNotMatch,
  config,
} from "./deps.ts";

const env = config();

const assertValueBetween = (actual: number, min: number, max: number): void => {
  if (actual < min) {
    const error = `actual: ${actual} expected to be greater than ${min}`;
    throw new AssertionError(error);
  } else if (actual > max) {
    const error = `actual: ${actual} expected to be less than ${max}`;
    throw new AssertionError(error);
  }
};

Deno.test("environment variable module should be present", () => {
  assertExists(env);
});

Deno.test("environment variable 'APP_HOST' should be an IP address", () => {
  const ipAddressRegex = new RegExp("^([0-9]{1,3}[.]){3}[0-9]{1,3}$");
  assertMatch(env.APP_HOST, ipAddressRegex);
});

Deno.test("environment variable 'APP_HOST' should not be nil", () => {
  assertNotEquals(env.APP_HOST, "");
});

Deno.test("environment variable 'APP_HOST' should not be a string or a number", () => {
  const wordOrNumericalRegex = new RegExp("^[\\w|\\d]+$");
  assertNotMatch(env.APP_HOST, wordOrNumericalRegex);
});

Deno.test("environment variable 'APP_PORT' should be a number", () => {
  const numericalRegex = new RegExp("^\\d+$");
  assertMatch(env.APP_PORT, numericalRegex);
});

Deno.test("environment variable 'APP_PORT' should be a number between 1024 and 49151", () => {
  const portNumber = parseInt(env.APP_PORT, 10);
  assertValueBetween(portNumber, 1024, 49151);
});

Deno.test("environment variable 'APP_PORT' should not be nil", () => {
  assertNotEquals(env.APP_PORT, "");
});

Deno.test("environment variable 'APP_PORT' should not be anything other than a number", () => {
  const numericalRegex = new RegExp("^\\D+$");
  assertNotMatch(env.APP_PORT, numericalRegex);
});

Deno.test("environment variable 'DB_USERNAME' should be a string", () => {
  const wordRegex = new RegExp("^\\w+$");
  assertMatch(env.DB_USERNAME, wordRegex);
});

Deno.test("environment variable 'DB_USERNAME' should not be nil", () => {
  assertNotEquals(env.DB_USERNAME, "");
});

Deno.test("environment variable 'DB_USERNAME' should not be anything other than a string", () => {
  const notWordRegex = new RegExp("^\\W+$");
  assertNotMatch(env.DB_USERNAME, notWordRegex);
});

Deno.test("environment variable 'DB_PASSWORD' should be present", () => {
  assertExists(env.DB_PASSWORD);
});

Deno.test("environment variable 'DB_PASSWORD' should not be nil", () => {
  assertNotEquals(env.DB_PASSWORD, "");
});

Deno.test("environment variable 'DB_CLUSTER_URL' should be a valid address", () => {
  const webAddressRegex = new RegExp("^(\\w+[.])+\\w+$");
  assertMatch(env.DB_CLUSTER_URL, webAddressRegex);
});

Deno.test("environment variable 'DB_CLUSTER_URL' should not be nil", () => {
  assertNotEquals(env.DB_CLUSTER_URL, "");
});

Deno.test("environment variable 'DB_NAME' should be a string", () => {
  const wordRegex = new RegExp("^\\w+$");
  assertMatch(env.DB_NAME, wordRegex);
});

Deno.test("environment variable 'DB_NAME' should not be nil", () => {
  assertNotEquals(env.DB_NAME, "");
});

Deno.test("environment variable 'DB_NAME' should not be anything other than a string", () => {
  const notWordRegex = new RegExp("^\\W+$");
  assertNotMatch(env.DB_NAME, notWordRegex);
});
