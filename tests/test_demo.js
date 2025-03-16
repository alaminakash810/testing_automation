const { Builder, By, Key, until } = require("selenium-webdriver");

async function example() {
    // Launch the browser
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // Navigate to the page
        console.log("Navigating to the page...");
        await driver.get("http://localhost:5500/web_apps_pages/selenium_test.html");

        let title = await driver.getTitle();
        console.log(`The title of the website is: ${title}`);
        await driver.manage().setTimeouts({implicit: 500});
        
        // Wait for the text field to be loaded (wait for 5 seconds)
        console.log("Waiting for the text field to be available...");
        await driver.wait(until.elementLocated(By.id("checkboxText")), 5000);

        // Test 1: Adding a valid todo
        console.log("Test 1: Adding a valid todo");

        // Add a delay before interacting with elements
        await driver.sleep(3000);

        // Find the text input element
        console.log("Sending keys to the text field...");
        const checkboxText = await driver.findElement(By.id("checkboxText"));
        await checkboxText.sendKeys("New Todo");

        // Wait for 2 seconds before clicking the Add button
        await driver.sleep(2000);
        console.log("Clicking the Add button...");
        const addButton = await driver.findElement(By.id("addButton"));
        await addButton.click();

        // Wait for 3 seconds to see the result
        await driver.sleep(3000);

        // Confirm that the new checkbox has been added (optional)
        const checkboxes = await driver.findElements(By.css(".checkbox-item"));
        console.log(`Number of checkboxes: ${checkboxes.length}`);

        // Print out the labels of the newly added checkboxes
        for (let i = 0; i < checkboxes.length; i++) {
            const label = await checkboxes[i].findElement(By.tagName("label"));
            const labelText = await label.getText();
            console.log(`Checkbox ${i + 1}: ${labelText}`);
        }

        // Test 2: Adding a todo with an empty text field
        console.log("Test 2: Adding an empty todo");

        // Clear the text field
        await checkboxText.clear();

        // Wait for 2 seconds before clicking the Add button
        await driver.sleep(2000);
        console.log("Clicking the Add button with empty text field...");
        await addButton.click();

        // Wait for the alert to appear and capture the message
        console.log("Waiting for the alert...");
        await driver.sleep(3000); // Sleep to wait for alert to appear
        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        const alertMessage = await alert.getText();
        console.log("Alert message:", alertMessage);

        // Accept the alert
        await alert.accept();

        // Final delay before closing the browser
        await driver.sleep(3000);

    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        // Close the browser
        console.log("Closing the browser...");
        await driver.quit();
    }
}

example();
