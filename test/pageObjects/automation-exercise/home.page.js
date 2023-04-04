import basePage from "./base.page";

class HomePage extends basePage{
    open() {
        browser.maximizeWindow();
        return browser.url(browser.config.baseUrl);
    }

    async viewProductDetails(product){
        this.allureReporter.startStep(`View Product Details of ${product}`);
        
        const productContainer = `//div[@class='product-image-wrapper'][.//p[text()='${product}']]`;
        const viewProductLink = "//a[text()='View Product']";
        await $(productContainer).scrollIntoView();
        await browser.pause(3000);
        await $(productContainer + viewProductLink).click();
        await this.checkForAd();
        await this.waitPageTitleToBe("Automation Exercise - Product Details", 5000);
        
        this.allureReporter.endStep();
    }
}

export default new HomePage();