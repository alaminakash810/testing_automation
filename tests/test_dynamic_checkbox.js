const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const path = require('path');

describe('Dynamic Checkbox Tests', function() {
    let driver;

    // This hook runs before each test
    beforeEach(async function() {
        // Initialize the Chrome WebDriver
        driver = await new Builder().forBrowser('chrome').build();
        
        // Get the absolute path to the HTML file
        const htmlPath = path.join(__dirname, '..', 'web_apps_pages', 'selenium_test.html');
        const fileUrl = `file://${htmlPath}`;
        console.log(`fileUrl: ${fileUrl}`);
        
        // Open the webpage
        await driver.get(fileUrl);
        
        // Add delay to see the page load
        await driver.sleep(2000);
    });

    // This hook runs after each test
    afterEach(async function() {
        // Add delay before closing
        await driver.sleep(2000);
        // Close the browser after each test
        await driver.quit();
    });

    // Test initial checkboxes
    it('should load with two default checkboxes', async function() {
        console.log('Testing initial checkboxes...');
        
        // Check number of checkboxes
        const checkboxes = await driver.findElements(By.css('.checkbox-item input[type="checkbox"]'));
        assert.strictEqual(checkboxes.length, 2, 'Initial page should have 2 checkboxes');
        console.log('Found', checkboxes.length, 'initial checkboxes');

        // Verify the labels of initial checkboxes
        const labels = await driver.findElements(By.css('.checkbox-item label'));
        assert.strictEqual(await labels[0].getText(), 'Sample Checkbox 1');
        assert.strictEqual(await labels[1].getText(), 'Sample Checkbox 2');
        console.log('Verified initial checkbox labels');
        
        // Add delay to see the results
        await driver.sleep(2000);
    });

    // Test adding a new checkbox
    it('should add a new checkbox with correct label', async function() {
        console.log('Testing adding new checkbox...');
        
        // Find the input field and add button
        const inputField = await driver.findElement(By.id('checkboxText'));
        const addButton = await driver.findElement(By.id('addButton'));

        // Add a new checkbox
        const testLabel = 'Test Checkbox 3';
        console.log('Entering text:', testLabel);
        await inputField.sendKeys(testLabel);
        await driver.sleep(1000);
        
        console.log('Clicking add button');
        await addButton.click();
        await driver.sleep(1000);

        // Verify the new checkbox was added
        const checkboxes = await driver.findElements(By.css('.checkbox-item input[type="checkbox"]'));
        assert.strictEqual(checkboxes.length, 3, 'Should have 3 checkboxes after adding one');
        console.log('New checkbox added successfully');

        // Verify the new label
        const labels = await driver.findElements(By.css('.checkbox-item label'));
        assert.strictEqual(await labels[2].getText(), testLabel);
        console.log('New checkbox label verified');
        
        // Add delay to see the results
        await driver.sleep(2000);
    });

    // Test empty input validation
    it('should show alert when trying to add empty checkbox', async function() {
        console.log('Testing empty input validation...');
        
        // Click add button with empty input
        const addButton = await driver.findElement(By.id('addButton'));
        console.log('Clicking add button with empty input');
        await addButton.click();
        await driver.sleep(1000);

        // Switch to alert and verify message
        console.log('Checking alert message');
        const alert = await driver.switchTo().alert();
        assert.strictEqual(await alert.getText(), 'Please enter a label for the checkbox.');
        await driver.sleep(1000);
        await alert.accept();
        console.log('Alert handled successfully');
        
        // Add delay to see the results
        await driver.sleep(2000);
    });

    // Test checkbox functionality
    it('should toggle checkbox state correctly', async function() {
        console.log('Testing checkbox toggle functionality...');
        
        // Get the first checkbox
        const firstCheckbox = await driver.findElement(By.id('checkbox1'));

        // Verify initial state
        assert.strictEqual(await firstCheckbox.isSelected(), false);
        console.log('Initial state verified: unchecked');
        await driver.sleep(1000);

        // Check the checkbox
        console.log('Checking the checkbox');
        await firstCheckbox.click();
        await driver.sleep(1000);
        assert.strictEqual(await firstCheckbox.isSelected(), true);
        console.log('Checkbox checked successfully');

        // Uncheck the checkbox
        console.log('Unchecking the checkbox');
        await firstCheckbox.click();
        await driver.sleep(1000);
        assert.strictEqual(await firstCheckbox.isSelected(), false);
        console.log('Checkbox unchecked successfully');
        
        // Add delay to see final state
        await driver.sleep(2000);
    });
}); 

