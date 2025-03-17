# Selenium Automation Testing with JavaScript

## Prerequisites
Before setting up Selenium for JavaScript, ensure you have the following installed:

1. **Node.js & npm** - Download and install from [Node.js official website](https://nodejs.org/). Check if Node.js and npm are installed by running:
   ```sh
   node -v
   npm -v
   ```
   This should output the installed versions of Node.js and npm.

2. **Google Chrome** (or any other browser you plan to test on). Ensure you have the latest version installed.

3. **WebDriver for Chrome** (Chromedriver) or another browser-specific driver. ChromeDriver should match your installed Chrome version.
   You can download it from [ChromeDriver Downloads](https://sites.google.com/chromium.org/driver/).

## Installation

1. **Initialize a new Node.js project (if not already set up):**
   ```sh
   npm init -y
   ```
   This creates a `package.json` file in your project directory.

2. **Install Selenium WebDriver:**
   ```sh
   npm install selenium-webdriver
   ```
   This installs the Selenium WebDriver package required for running automation scripts.

3. **Install ChromeDriver (for Chrome testing):**
   ```sh
   npm install chromedriver
   ```
   If you plan to use Firefox, install `geckodriver` instead:
   ```sh
   npm install geckodriver
   ```

4. **(Optional) Install Mocha or Jest for running tests:**
   ```sh
   npm install mocha chai --save-dev
   ```
   or
   ```sh
   npm install jest --save-dev
   ```
   These frameworks help structure and execute tests efficiently.

## Setting Up Your First Test

Create a test script (e.g., `test.js`) and add the following code:

```javascript
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.google.com');
        let searchBox = await driver.findElement(By.name('q'));
        await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);
        await driver.wait(until.titleContains('Selenium WebDriver'), 5000);
        console.log('Test passed: Search executed successfully');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.quit();
    }
})();
```

## Running the Test

1. Ensure ChromeDriver is available in your system path or specify the path manually.
2. Run the test using:
   ```sh
   node test.js
   ```
   If everything is set up correctly, the script will open Google, perform a search, and validate the page title.

## Running Tests with Mocha

1. Create a `test` folder and add a test file, e.g., `test/googleTest.js`.
2. Use the following example test:

```javascript
const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Google Search Test', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should search for Selenium WebDriver', async function() {
        await driver.get('https://www.google.com');
        let searchBox = await driver.findElement(By.name('q'));
        await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);
        await driver.wait(until.titleContains('Selenium WebDriver'), 5000);
        let title = await driver.getTitle();
        expect(title).to.include('Selenium WebDriver');
    });
});
```

3. Run the test using Mocha:
   ```sh
   npx mocha test/
   ```
   This will execute all test files inside the `test/` directory.

## Additional Configurations

### Using a Different Browser

Change `.forBrowser('chrome')` to:
- `'firefox'` for Mozilla Firefox
- `'edge'` for Microsoft Edge

Example:
```javascript
let driver = new Builder().forBrowser('firefox').build();
```

### Running Tests in Headless Mode

To run tests without opening a browser window (useful for CI/CD pipelines), use:

```javascript
const chrome = require('selenium-webdriver/chrome');
let options = new chrome.Options().headless();
let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
```

### Using Environment Variables for WebDriver
Instead of manually managing WebDriver executables, set environment variables:

- **Windows:**
  ```sh
  set PATH=%PATH%;C:\path\to\chromedriver
  ```
- **Mac/Linux:**
  ```sh
  export PATH=$PATH:/path/to/chromedriver
  ```

This allows you to run Selenium tests without specifying the driver location explicitly.

## Troubleshooting

- **ChromeDriver Version Mismatch:**
  - Ensure your ChromeDriver version matches your installed Chrome browser version.
  - Run:
    ```sh
    chromedriver --version
    google-chrome --version
    ```

- **WebDriver Not Found:**
  - If `chromedriver` is not found, install it manually or specify the path explicitly:
    ```javascript
    let service = new chrome.ServiceBuilder('/path/to/chromedriver').build();
    let driver = new Builder().forBrowser('chrome').setChromeService(service).build();
    ```

- **Selenium Errors:**
  - Ensure you have installed `selenium-webdriver` properly.
  - Restart your terminal or system if WebDriver does not respond.
  - Run `npm list selenium-webdriver` to verify the package installation.

## Conclusion
You now have a complete Selenium setup for JavaScript testing! Modify and expand your tests 
as needed to automate web interactions efficiently. Feel free to integrate this with CI/CD pipelines 
for automated deployment and testing workflows.
