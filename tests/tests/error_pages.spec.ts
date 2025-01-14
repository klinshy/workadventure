import { expect, test } from '@playwright/test';
import {RENDERER_MODE} from "./utils/environment";
import {publicTestMapUrl} from "./utils/urls";
import Map from "./utils/map";

test.describe('Error pages', () => {
  test('successfully displayed for unsupported URLs', async ({ page }, { project }) => {
    // Skip test for mobile device
    if(project.name === "mobilechromium") {
      //eslint-disable-next-line playwright/no-skipped-test
      test.skip();
      return;
    }
    
    await page.goto(
      `/@/not/supported?phaserMode=${RENDERER_MODE}`
    );

    await expect(page.getByText('Unsupported URL format')).toBeVisible();
  });

  test('successfully displayed for not found public pages', async ({ page }, { project }) => {
    // Skip test for mobile device
    if(project.name === "mobilechromium") {
      //eslint-disable-next-line playwright/no-skipped-test
      test.skip();
      return;
    }
    
    await page.goto(
        publicTestMapUrl("does/not/exist", "error_pages")
    );

    await page.fill('input[name="loginSceneName"]', 'Alice');
    await page.click('button.loginSceneFormSubmit');
    await page.click('button.selectCharacterSceneFormSubmit');
    await page.click("text=Let's go!");

    await expect(page.getByText('An error occurred')).toBeVisible();
  });

  test('successfully displayed for not found WAM', async ({ page }, { project }) => {
    // Skip test for mobile device
    if(project.name === "mobilechromium") {
      //eslint-disable-next-line playwright/no-skipped-test
      test.skip();
      return;
    }

    await page.goto(
        Map.url("not-found")
    );

    await page.fill('input[name="loginSceneName"]', 'Alice');
    await page.click('button.loginSceneFormSubmit');
    await page.click('button.selectCharacterSceneFormSubmit');
    await page.click("text=Let's go!");

    await expect(page.getByText('An error occurred')).toBeVisible();
  });
});
