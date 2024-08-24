import { describe as bunDescribe, it as bunIt, expect as bunExpect, test as bunTest } from "bun:test";

declare global {
  const describe: typeof bunDescribe;
  const it: typeof bunIt;
  const test: typeof bunTest;
  const expect: typeof bunExpect;
  // Add other globals as needed
  const beforeAll: typeof globalThis.beforeAll;
  const afterAll: typeof globalThis.afterAll;
  const beforeEach: typeof globalThis.beforeEach;
  const afterEach: typeof globalThis.afterEach;
  const bun: typeof bun;
}

export {};
