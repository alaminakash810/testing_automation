# Selenium Automation Testing with JavaScript  

## Prerequisites  

Before setting up Selenium for JavaScript, ensure you have the following installed:  

1. **Node.js & npm**  
   - Download and install from [Node.js official website](https://nodejs.org/).  
   - Check if Node.js and npm are installed by running:  
     ```sh
     node -v
     npm -v
     ```
   - This should output the installed versions of Node.js and npm.  

2. **Google Chrome** (or another browser for testing).  
   - Ensure you have the latest version installed.  

3. **WebDriver for Chrome** (Chromedriver) or another browser-specific driver.  
   - ChromeDriver should match your installed Chrome version.  
   - Download it from [ChromeDriver Downloads](https://sites.google.com/chromium.org/driver/).  

## Installation  

### 1. Initialize a New Node.js Project (If Not Already Set Up)  

Run the following command to create a `package.json` file:  

```sh
npm init -y
```

### 2. Install Required Packages  

#### Install Selenium WebDriver  
```sh
npm install selenium-webdriver
```

### 3. Install Required Packages "axios" for HTTP method checking [Optional] 

#### Install axios 
```sh
npm install axios
```

#### Install ChromeDriver (for Chrome Testing)  
```sh
npm install chromedriver
```

> **For Firefox users**, install `geckodriver` instead:  
```sh
npm install geckodriver
```

## Using Mocha for Testing  

### Installing Mocha (Version 11.1.0)  

To use Mocha version 11.1.0 in this project, follow these steps:  

#### 1. Add Mocha to `package.json`  

Manually add the following entry under `devDependencies` in your `package.json`:  

```json
"devDependencies": {
  "mocha": "11.1.0"
}
```

#### 2. Install Dependencies  

After updating `package.json`, run the following command to install Mocha:  

```sh
npm install
```

This will install Mocha version **11.1.0** and any other dependencies listed in `package.json`.

#### 3. Verify the Installation  

To check if Mocha is installed correctly, run:  

```sh
npx mocha --version
```

If installed successfully, it will display:  

```sh
11.1.0
```

Mocha is now ready for use in your project! 🎯 🚀  

### Running Tests with Mocha  

1. **Create a `test` directory** and add a test file, e.g., `test/googleTest.js`.  

2. **Write the test script**  

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

3. **Run the Mocha test**  

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

### **ChromeDriver Version Mismatch**  
- Ensure your ChromeDriver version matches your installed Chrome browser version.  
- Run:  
  ```sh
  chromedriver --version
  google-chrome --version
  ```

### **WebDriver Not Found**  
- If `chromedriver` is not found, install it manually or specify the path explicitly:  
  ```javascript
  let service = new chrome.ServiceBuilder('/path/to/chromedriver').build();
  let driver = new Builder().forBrowser('chrome').setChromeService(service).build();
  ```

### **Selenium Errors**  
- Ensure you have installed `selenium-webdriver` properly.  
- Restart your terminal or system if WebDriver does not respond.  
- Run `npm list selenium-webdriver` to verify the package installation.  

## Conclusion  

You now have a complete Selenium setup for JavaScript testing!  
Modify and expand your tests as needed to automate web interactions efficiently.  
Feel free to integrate this with CI/CD pipelines for automated deployment and testing workflows.  
