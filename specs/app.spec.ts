import { test, expect } from "@playwright/test";

test.describe("What the user sees when they launch the app:", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("A header that welcomes PyATL.", async ({ page }) => {
    const header = await page.locator("header h1");
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/PyATL|Python Atlanta/);
  });

  test("Instruction subtext beneath the header.", async ({ page }) => {
    const subtext = await page.locator("header h1+p");
    await expect(subtext).toBeVisible();
    await expect(subtext).toHaveText(/click.*(button|logo)/);
  });

  test("A button with the Python Atlanta logo on it.", async ({ page }) => {
    test.fail();
  });

  test("A label that says 'click me', pointing at the button.", async ({
    page,
  }) => {
    test.fail();
  });

  test("The number of times the button has been clicked by all users, labeled as such.", async ({
    page,
  }) => {
    test.fail();
  });

  test("The number of clickers online, including themself.", async ({
    page,
  }) => {
    test.fail();
  });

  test("A link to the sign-up page for the PyATL Jam session in April.", async ({
    page,
  }) => {
    test.fail();
  });

  test("A link to my website.", async ({ page }) => {
    test.fail();
  });
});

test.describe("How the user can interact with the button:", () => {
  test("Click the button with the left mouse button.", async ({ page }) => {
    test.fail();
  });

  test("Click the button by tapping it.", async ({ page }) => {
    test.fail();
  });

  test("Focus the button with the keyboard.", async ({ page }) => {
    test.fail();
  });

  test("Click the button by focusing it and pressing ENTER or SPACE.", async ({
    page,
  }) => {
    test.fail();
  });
});

test.describe("What happens when the user clicks the button:", () => {
  test("The number upon the button increments by 1.", async ({ page }) => {
    test.fail();
  });

  test("The label that says 'click me' disappears.", async ({ page }) => {
    test.fail();
  });
});

test.describe("What the user sees when a another user does things:", () => {
  test("The clicks counter goes up by 1 when a another user clicks the button.", async ({
    page,
  }) => {
    test.fail();
  });

  test("The clickers online counter goes up by 1 when another user launches the app.", async ({
    page,
  }) => {
    test.fail();
  });

  test("The clickers online counter goes down by 1 when another user, currently using the app, closes the app.", async ({
    page,
  }) => {
    test.fail();
  });

  test.describe("What happens when the user clicks the external links:", () => {
    test("The link to the PyATL April Jam session opens (meetup.com/...) in a new tab.", async ({
      page,
    }) => {
      test.fail();
    });

    test("The link to my website opens (mikechurvis.com) in a new tab.", async ({
      page,
    }) => {
      test.fail();
    });
  });
});
