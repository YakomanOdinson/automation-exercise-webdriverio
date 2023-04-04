import basePage from "./base.page";

class Checkout extends basePage{
    async placeOrder(message){
        this.allureReporter.startStep(`Place order with message ${message}`);
        
        await $("//textarea[@name='message']").setValue(message);
        await browser.takeScreenshot();
        await $("//a[text()='Place Order']").click();
        await this.waitPageTitleToBe("Automation Exercise - Payment", 5000);

        this.allureReporter.endStep();
    }
}

export default new Checkout();