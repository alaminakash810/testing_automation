const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const path = require('path');

describe('Dynamic Checkbox Tests', function() {
    let driver;

    // Increase timeout for the entire test suite
    this.timeout(30000);

    beforeEach(async function() {
        try {
            // Setup Chrome options
            const options = new chrome.Options();
            // Add options for stability
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-dev-shm-usage');
            
            // Initialize the Chrome WebDriver with options
            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();

            // Get the absolute path to the HTML file
            const htmlPath = path.resolve(__dirname, '..', 'web_apps_pages', 'selenium_test.html');
            const fileUrl = `file://${htmlPath}`;
            
            console.log('Loading file:', fileUrl); // Debug log
            
            // Open the webpage with wait
            await driver.get(fileUrl);
            // Wait for the page to be loaded
            await driver.wait(until.elementLocated(By.id('checkboxList')), 5000);
            
        } catch (error) {
            console.error('Setup failed:', error);
            throw error;
        }
    });

    afterEach(async function() {
        if (driver) {
            try {
                await driver.quit();
            } catch (error) {
                console.error('Error closing driver:', error);
            }
        }
    });

    it('should load with two default checkboxes', async function() {
        try {
            const checkboxes = await driver.findElements(By.css('.checkbox-item input[type="checkbox"]'));
            assert.strictEqual(checkboxes.length, 2, 'Initial page should have 2 checkboxes');

            const labels = await driver.findElements(By.css('.checkbox-item label'));
            assert.strictEqual(await labels[0].getText(), 'Sample Checkbox 1');
            assert.strictEqual(await labels[1].getText(), 'Sample Checkbox 2');
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('should add a new checkbox with correct label', async function() {
        try {
            const inputField = await driver.findElement(By.id('checkboxText'));
            const addButton = await driver.findElement(By.id('addButton'));

            const testLabel = 'Test Checkbox 3';
            await inputField.sendKeys(testLabel);
            await addButton.click();

            // Wait for the new checkbox to be added
            await driver.wait(
                until.elementLocated(By.xpath(`//label[text()='${testLabel}']`)),
                5000
            );

            const checkboxes = await driver.findElements(By.css('.checkbox-item input[type="checkbox"]'));
            assert.strictEqual(checkboxes.length, 3, 'Should have 3 checkboxes after adding one');

            const labels = await driver.findElements(By.css('.checkbox-item label'));
            assert.strictEqual(await labels[2].getText(), testLabel);
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('should show alert when trying to add empty checkbox', async function() {
        try {
            const addButton = await driver.findElement(By.id('addButton'));
            await addButton.click();

            // Wait for alert to be present
            const alert = await driver.wait(until.alertIsPresent(), 5000);
            assert.strictEqual(await alert.getText(), 'Please enter a label for the checkbox.');
            await alert.accept();
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('should toggle checkbox state correctly', async function() {
        try {
            const firstCheckbox = await driver.findElement(By.id('checkbox1'));
            
            assert.strictEqual(await firstCheckbox.isSelected(), false);

            await firstCheckbox.click();
            assert.strictEqual(await firstCheckbox.isSelected(), true);

            await firstCheckbox.click();
            assert.strictEqual(await firstCheckbox.isSelected(), false);
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });
}); 