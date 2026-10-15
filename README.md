# SauceDemo Playwright POM

Automated login tests for [SauceDemo](https://www.saucedemo.com/), written with Playwright and TypeScript using the Page Object Model (POM).

## What this project shows
- Page Object Model: page steps live in `pages/`, test checks live in `tests/`
- Positive, negative and edge case testing for the login page

## Scenarios covered
- Valid login (positive)
- Locked out user, wrong password, empty username, empty password, both fields empty (negative)
- Very long username, case-sensitive username, slow `performance_glitch_user` (edge)

## Project structure
- `pages/LoginPage.ts` : locators and actions for the login page
- `tests/saucelogin.spec.ts` : test cases that use LoginPage

## How to run
1. Install the tools: `npm install`
2. Install the browsers: `npx playwright install`
3. Run the tests: `npx playwright test saucelogin.spec.ts --project=chromium --headed`

## Tools
Playwright, TypeScript, Node.js