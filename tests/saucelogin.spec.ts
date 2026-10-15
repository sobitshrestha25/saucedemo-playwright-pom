
// Brings in "test" (to create a test case) and "expect" (to check results)
import { test, expect } from '@playwright/test';

// Brings in our helper from the pages folder (works because of export)
import { LoginPage } from '../pages/LoginPage';

// Test 1: Valid login
test('valid login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  // Check whether login was successful
  await expect(page).toHaveURL(/inventory/);

  // Keep the result visible for 3 seconds
  await page.waitForTimeout(3000);
});

// Test 2: Locked-out user
test('locked out user', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('locked_out_user', 'secret_sauce');

  // Check the error message
  await expect(login.errorMessage).toContainText('locked out');

  // Keep the result visible for 3 seconds
  await page.waitForTimeout(3000);
});

// Test 3: Wrong password
test('wrong password', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('standard_user', 'wrong_pass');

  // Check the error message
  await expect(login.errorMessage).toContainText('do not match');

  // Keep the result visible for 3 seconds
  await page.waitForTimeout(3000);
});

// Test 4: Empty username
test('empty username', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('', 'secret_sauce');

  // Check the error message
  await expect(login.errorMessage).toContainText('Username is required');

  // Keep the result visible for 3 seconds
  await page.waitForTimeout(3000);
});

// Test 5: Empty password
test('empty password', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('standard_user', '');

  // Check the error message
  await expect(login.errorMessage).toContainText('Password is required');

  // Keep the result visible for 3 seconds
  await page.waitForTimeout(3000);
});
test('very long username', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('a'.repeat(200), 'secret_sauce');
  await expect(login.errorMessage).toContainText('do not match');
});

test('performance glitch user', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('performance_glitch_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/, { timeout: 10000 });
});
test('both fields empty', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('', '');
  await expect(login.errorMessage).toContainText('Username is required');
});

test('username is case sensitive', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('STANDARD_USER', 'secret_sauce');
  await expect(login.errorMessage).toContainText('do not match');
});