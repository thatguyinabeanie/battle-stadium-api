import { GlobalRegistrator } from "@happy-dom/global-registrator";
import * as matchers from "@testing-library/jest-dom/matchers";
import {
  describe,
  it,
  expect,
  test,
  jest,
  mock,
  spyOn,
  setDefaultTimeout,
  setSystemTime,
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
} from "bun:test";

const oldConsole = console;

GlobalRegistrator.register();
window.console = oldConsole;

expect.extend(matchers);
Object.assign(global, {
  describe,
  it,
  expect,
  test,
  jest,
  mock,
  spyOn,
  setDefaultTimeout,
  setSystemTime,
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
});
