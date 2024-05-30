import firefox from "selenium-webdriver/firefox";
import { Builder } from "selenium-webdriver";
import config from "../config";

export async function getFixedURLs(shared_url: string | null) {
    try {
        if (!shared_url) throw new Error("The URL was unable to be parsed");

        const options = new firefox.Options();
        options.addArguments("-headless");
        options.setBinary(config.selenium.binaries.firefox);

        const driver = new Builder().forBrowser("firefox").setFirefoxOptions(options).build();

        await driver.get(shared_url);

        const unfucked_url = await driver.getCurrentUrl();

        await driver.quit();

        const old_url = unfucked_url.replace("www", "old");
        const new_url = unfucked_url.replace("www", "new");

        const comment = `I have corrected the /s/ reddit shortlink back to the standard link format. Here are the fixed links compatible with desktop and mobile reddit:\n\n[Old Reddit](${old_url})\n\n[New Reddit](${new_url})`;
        return comment;
    } catch (error) {
        console.log(error);
        return "Sorry, I was either unable to parse the comment or post for a valid /s/ share link to correct, or was unable to scrape the webpage for an unexpected reason with Selenium. Reddit may at any point in time reduce access to their website via automation and accessiblity tools, and future compatibility is not guaranteed.`";
    }
}
