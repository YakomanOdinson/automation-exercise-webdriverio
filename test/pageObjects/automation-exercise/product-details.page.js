import basePage from "./base.page";

class ProductDetails extends basePage{
    
    async addProductQuantityToCart(quantity){
        this.allureReporter.startStep(`Add product quantity of ${quantity} to cart`);
        
        await this.setProductQuantity(quantity);
        await $("//button[contains(@class,'cart')]").click();
        await this.waitForModalDisplay("Added!", 3000);
        await $("//*[text()='View Cart']").click();
        await this.waitPageTitleToBe("Automation Exercise - Checkout", 5000);
        
        this.allureReporter.endStep();
    }

    async setProductQuantity(quantity){
        await $("//input[@id='quantity']").setValue(quantity);
        await browser.takeScreenshot();
        this.allureReporter.addStep(`Set product quantity to ${quantity}`);
    }
}

export default new ProductDetails();