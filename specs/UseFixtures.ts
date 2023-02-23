import { test as baseTest } from "@playwright/test";
import { MockBackendDriver } from "./fixtures/MockBackendDriver.js";

type Fixtures = {
  mockBackend: MockBackendDriver;
};

export const test = baseTest.extend<Fixtures>({
  // Playwright forces the first argument to use object destructuring, even if you're not using the argument. ESLint doesn't like that.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mockBackend: async ({ page }, use) => {
    await use(new MockBackendDriver());
  },
});
