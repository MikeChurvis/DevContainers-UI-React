import { test as baseTest } from "@playwright/test";
import { MockBackend } from "./fixtures/MockBackend.js";

type Fixtures = {
  mockBackend: MockBackend;
};

export const test = baseTest.extend<Fixtures>({
  // Playwright forces the first argument to use object destructuring, even if you're not using the argument. ESLint doesn't like that.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mockBackend: async ({ page }, use) => {
    const mockBackend = new MockBackend();

    await use(mockBackend);

    mockBackend.shutdown();
  },
});
