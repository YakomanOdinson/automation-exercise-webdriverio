import basePage from "./base.page";

class Cart extends basePage{

    async validateCartProducts(expectedProduct, expectedQuantity){
        this.allureReporter.startStep(`Validate cart has ${expectedProduct}x${expectedQuantity}`);
        const expectedProductFound = await this.checkObjectDisplayed(`//tr[.//*[text()='${expectedProduct}']][.//*[text()='${expectedQuantity}']]`);
        this.allureReporter.endStep(expectedProductFound ? "passed" : "failed");
    }

    async newUserGoToCheckout(){
        this.allureReporter.startStep("Proceed to checkout - new user");
        
        await $("//a[text()='Proceed To Checkout']").click();
        await this.waitForModalDisplay("Checkout", 3000);
        await $("//*[text()='Register / Login']").click();
        await this.waitPageTitleToBe("Automation Exercise - Signup / Login", 5000);
        
        this.allureReporter.endStep();
    }

    async existingUserGoToCheckout(){
        this.allureReporter.startStep("Proceed to checkout - existing user");
        
        await $("//a[text()='Proceed To Checkout']").click();
        await this.waitUrlToContain("/checkout", 5000);

        this.allureReporter.endStep();
    }
}

export default new Cart();