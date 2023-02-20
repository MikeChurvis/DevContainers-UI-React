import { test, expect, Locator, Page } from "@playwright/test";
import { getCenterOfElement } from "./utils";

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
    const logo = button.locator("img");

    await expect(button).toBeVisible();
    await expect(logo).toBeVisible();
  });

  // TODO: decide whether this feature is necessary.
  // test("A label that says 'click me', pointing at the button.", async ({
  //   page,
  // }) => {
  //   test.skip();
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

test.describe("The behavior of the button:", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("It is clickable.", async ({ page }) => {
    const button = page.locator("main button");

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await button.click();
  });

  test("It is focusable.", async ({ page }) => {
    const button = page.locator("main button");

    await button.focus();
    await expect(button).toBeFocused();
  });

  test("When clicked, the displayed number of clicks increments by 1.", async ({
    page,
  }) => {
    const button = page.locator("main button");

    expect(await getCurrentNumberOfClicks(page)).toEqual(0);

    await button.click();

    expect(await getCurrentNumberOfClicks(page)).toEqual(1);
  });
});

test.describe("What the user sees when a another user does things:", () => {
  test("The clicks counter goes up by 1 when a another user clicks the button.", async ({
    page,
  }) => {
    test.skip();
  });

  test("The clickers online counter goes up by 1 when another user launches the app.", async ({
    page,
  }) => {
    test.skip();
  });

  test("The clickers online counter goes down by 1 when another user, currently using the app, closes the app.", async ({
    page,
  }) => {
    test.skip();
  });

  test.describe("What happens when the user clicks the external links:", () => {
    test("The link to the PyATL April Jam session opens (meetup.com/...) in a new tab.", async ({
      page,
    }) => {
      test.skip();
    });

    test("The link to my website opens (mikechurvis.com) in a new tab.", async ({
      page,
    }) => {
      test.skip();
    });
  });
});

async function getCurrentNumberOfClicks(page: Page) {
  return Number.parseInt(
    await page.getByTestId("clicks").getByRole("status").innerText()
  );
}
