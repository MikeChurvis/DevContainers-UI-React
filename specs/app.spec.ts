import { test, expect } from "@playwright/test";

test.describe("What the user sees when they launch the app:", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("A header that welcomes PyATL.", async ({ page }) => {
    const header = page.locator("header").getByRole("heading");

    await expect(header).toBeVisible();
    await expect(header).toHaveText(/PyATL|Python Atlanta/);
  });

  test("Instruction subtext beneath the header.", async ({ page }) => {
    const subtext = page.locator("header h1+p");

    await expect(subtext).toBeVisible();
    await expect(subtext).toHaveText(/click.*(button|logo)/);
  });

  test("A button with the Python Atlanta logo on it.", async ({ page }) => {
    const button = page.locator("main button");
    const logo = button.getByAltText(/(PyATL|Python Atlanta) logo/);

    await expect(button).toBeVisible();
    await expect(logo).toBeVisible();
  });

  // TODO: decide whether this feature is necessary.
  // test("A label that says 'click me', pointing at the button.", async ({
  //   page,
  // }) => {
  //   test.fail();
  // });

  test("The number of times the button has been clicked by all users, labeled as such.", async ({
    page,
  }) => {
    const clicksLabel = page.getByTestId("clicks").getByText(/clicks/i);
    const clicksNumber = page.getByTestId("clicks").getByRole("status");

    await expect(clicksLabel).toBeVisible();
    await expect(clicksNumber).toBeVisible();
    await expect(clicksNumber).toHaveText(/[0-9]*/);
  });

  test("The number of users online, including themself.", async ({ page }) => {
    const usersOnlineLabel = page
      .getByTestId("users-online")
      .getByText(/online/i);
    const usersOnlineNumber = page
      .getByTestId("users-online")
      .getByRole("status");

    await expect(usersOnlineLabel).toBeVisible();
    await expect(usersOnlineNumber).toBeVisible();
    await expect(usersOnlineNumber).toHaveText(/[0-9]*/);
  });

  test("A link to the sign-up page for the PyATL Jam session in April.", async ({
    page,
  }) => {
    const jamSessionLink = page
      .locator("footer")
      .getByText(/jam|workshop|join|sign up/i);

    await expect(jamSessionLink).toBeVisible();
    expect(await jamSessionLink.getAttribute("href")).toMatch("meetup.com");
  });

  test("A link to my website.", async ({ page }) => {
    const myWebsiteLink = page.locator("footer").getByText(/website/i);

    await expect(myWebsiteLink).toBeVisible();
    expect(await myWebsiteLink.getAttribute("href")).toMatch("mikechurvis.com");
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
