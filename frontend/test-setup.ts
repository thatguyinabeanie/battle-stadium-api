import { GlobalRegistrator } from "@happy-dom/global-registrator";
import * as matchers from "@testing-library/jest-dom/matchers";
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach, test, mock } from "bun:test";
import * as bun from "bun:test";

const oldConsole = console;

GlobalRegistrator.register();
window.console = oldConsole;

expect.extend(matchers);

Object.assign(global, {
  mock,
  bun,
  describe,
  test,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
});
