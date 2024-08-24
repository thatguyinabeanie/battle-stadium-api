import {
  describe as bunDescribe,
  it as bunIt,
  expect as bunExpect,
  test as bunTest,
  beforeAll as bunBeforeAll,
  afterAll as bunAfterAll,
  beforeEach as bunBeforeEach,
  afterEach as bunAfterEach,
  mock as bunMock,
} from "bun:test";

declare global {
  const describe: typeof bunDescribe;
  const it: typeof bunIt;
  const test: typeof bunTest;
  const expect: typeof bunExpect;
  // Add other globals as needed
  const beforeAll: typeof bunBeforeAll;
  const afterAll: typeof bunAfterAll;
  const beforeEach: typeof bunBeforeEach;
  const afterEach: typeof bunAfterEach;
  const bun: typeof bunMock;
}

export {};
