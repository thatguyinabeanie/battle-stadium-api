import {
  describe as bunDescribe,
  it as bunIt,
  expect as bunExpect,
  test as bunTest,
  jest as bunJest,
  mock as bunMock,
  spyOn as bunSpyOn,
  setDefaultTimeout as bunSetDefaultTimeout,
  setSystemTime as bunSetSystemTime,
  afterAll as bunAfterAll,
  afterEach as bunAfterEach,
  beforeAll as bunBeforeAll,
  beforeEach as bunBeforeEach,
} from "bun:test";

declare global {
  const describe: typeof bunDescribe;
  const it: typeof bunIt;
  const expect: typeof bunExpect;
  const test: typeof bunTest;

  const jest: typeof bunJest;
  const mock: typeof bunMock;
  const spyOn: typeof bunSpyOn;

  const setDefaultTimeout: typeof bunSetDefaultTimeout;
  const setSystemTime: typeof bunSetSystemTime;

  const afterAll: typeof bunAfterAll;
  const afterEach: typeof bunAfterEach;
  const beforeAll: typeof bunBeforeAll;
  const beforeEach: typeof bunBeforeEach;
}

export {};
