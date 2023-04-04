import basePage from "./base.page";

class Payment extends basePage{

    async payConfirmOrder(cardName, cardNumber, cvc, expirationMonth, expirationYear){
        this.allureReporter.startStep("Pay and confirm order");

        await this.enterCardDetails(cardName, cardNumber, cvc, expirationMonth, expirationYear);
        await $("//button[@data-qa='pay-button']").click();
        await this.waitPageTitleToBe("Automation Exercise - Order Placed", 5000);
        await $("//*[@data-qa='continue-button']").click();
        await this.waitPageTitleToBe("Automation Exercise", 5000);

        this.allureReporter.endStep();
    }


    async enterCardDetails(cardName, cardNumber, cvc, expirationMonth, expirationYear){
        this.allureReporter.startStep(`Enter card information with details: cardName = ${cardName}, cardNumber = ${cardNumber}, cvc = ${cvc}, expirationMonth = ${expirationMonth} and expirationYear = ${expirationYear}`)
        
        await $("//input[@data-qa='name-on-card']").setValue(cardName);
        await $("//input[@data-qa='card-number']").setValue(cardNumber);
        await $("//input[@data-qa='cvc']").setValue(cvc);
        await $("//input[@data-qa='expiry-month']").setValue(expirationMonth);
        await $("//input[@data-qa='expiry-year']").setValue(expirationYear);

        await browser.takeScreenshot();
        this.allureReporter.endStep();
    }
}

export default new Payment();