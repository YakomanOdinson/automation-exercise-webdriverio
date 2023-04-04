import path from "node:path";
import AllureReporter from "@wdio/allure-reporter"
import navBarComponent from "./components/navbar.comp";


export default class BasePage{
    
    get allureReporter() {
        return AllureReporter
    }

    get navBar(){
        return navBarComponent;
    }

    async waitPageTitleToBe(expectedTitle,waitTime){
        this.allureReporter.addStep(`Browser title expected to change to ${expectedTitle} within ${waitTime} ms`);
        await browser.waitUntil(async function(){
            return await browser.getTitle() === expectedTitle;
        }, {
            timeout: waitTime,
            timeoutMsg: `Browser title didnt change to '${expectedTitle}'`
        });
        this.allureReporter.addStep("Browser title changed to expected")
        await browser.takeScreenshot();
    }

    async waitUrlToContain(expectedValueInUrl,waitTime){
        this.allureReporter.addStep(`URL expected to contain ${expectedValueInUrl} within ${waitTime} ms`);
        await browser.waitUntil(async function(){
            const url = await browser.getUrl();
            return url.includes(expectedValueInUrl);
        }, {
            timeout: waitTime,
            timeoutMsg: `Browser url didnt change to contain value '${expectedValueInUrl}'`
        });
        this.allureReporter.addStep("URL contains the expected value");
        await browser.takeScreenshot();
    }

    async waitForModalDisplay(modalTitle, waitTime){
        this.allureReporter.addStep(`Validate modal content with title ${modalTitle} to show`);
        await $(`//div[@class='modal-content'][.//*[text()='${modalTitle}']]`).waitForDisplayed({timeout: waitTime});
        await browser.takeScreenshot();
    }

    async checkObjectDisplayed(xpath){
        const objFound = await $(xpath).isDisplayed();
        this.allureReporter.addStep(`Look for object with locator ${xpath}. Object found: ${objFound}`);
        return objFound;
    }
    
    async checkForAd() {
        this.allureReporter.addStep("Check for ad pop up");
        const iframeAddParent = await $("//ins[@aria-hidden]//iframe");
        
        const addCloseButton = await $("//div[@id='dismiss-button']")
        try {
            await iframeAddParent.waitForDisplayed({ timeout: 5000 })
            await browser.switchToFrame(iframeAddParent);
            await addCloseButton.click();
            this.allureReporter.addStep("Ad found. Closed it.");
        } catch (error) {
            try {
                const iframeAdd = await $("//iframe[@id='ad_iframe']");
                await browser.switchToFrame(iframeAdd);
                await addCloseButton.click();
                this.allureReporter.addStep("Ad found. Closed it.");
            } catch (error) {
                await browser.pause(600000);
                this.allureReporter.addStep("Ad not found");
            }
        }
        await browser.switchToFrame(null);
    }
}
