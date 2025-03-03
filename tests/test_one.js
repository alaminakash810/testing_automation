const { Builder } = require("selenium-webdriver");
const assert = require("assert");

describe("Simple Google Test", function () {
    let driver;

    this.timeout(20000); // Increase timeout to 20 seconds

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });

    it("should open Google and check the title", async function () {
        await driver.get("https://www.google.com");
        let title = await driver.getTitle();
        assert.strictEqual(title, "Google"); // Check if title is exactly "Google"
    });

    after(async function () {
        await driver.quit();
    });
});
