import type { Locator } from "@playwright/test";

/**
 *
 * @param locator The Playwright Locator that points the element whose center you want to find.
 * @returns
 */
export async function getCenterOfElement(locator: Locator) {
  const elementBoundingBox = await locator.boundingBox();

  if (elementBoundingBox === null) {
    return Promise.reject(
      Error(
        "The element's screen-space center cannot be calculated because the element is not visible."
      )
    );
  }

  const { x, y, width, height } = elementBoundingBox;

  return { x: x + width / 2, y: y + height / 2 };
}
