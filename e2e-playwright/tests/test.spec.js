const { test, expect } = require("@playwright/test");

test("Server add and show lists", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[value='Adding list!']").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

test("Server show one list", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[value='Adding list!']").click();
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(listName);
});

test("Server add item and show", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[value='Adding list!']").click();
  await page.locator(`a >> text='${listName}'`).click();
  const itemName = `My item: ${Math.random()}`;
  await page.locator("input[name=name]").type(itemName);
  await page.locator("input[value='Adding items!']").click();
  await expect(page.locator(`div >> text='${itemName}'`)).toHaveText(itemName);
});

test("Server item collected", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[value='Adding list!']").click();
  await page.locator(`a >> text='${listName}'`).click();
  const itemName = `My item: ${Math.random()}`;
  await page.locator("input[name=name]").type(itemName);
  await page.locator("input[value='Adding items!']").click();
  await page.locator("input[value='Mark collected!']").click();
  await expect(page.locator(`del >> text='${itemName}'`)).toHaveText(itemName);
});

test("Server deactivating shopping lists", async ({ page }) => {
  await page.goto("/lists");
  const listName = `testforDeactivating`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[value='Adding list!']").click();
  await page.locator(`input[name=${listName}]`).click();
  const nonExistentElement = await page.locator(`a >> text='${listName}'`).count();
  expect(nonExistentElement).toBe(0);
});

