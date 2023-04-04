import basePage from "./base.page";

class ContactUs extends basePage{
    
    async sendMessage(name, email, subject, message, file){
        this.allureReporter.startStep("Send message in contact us page");

        await this.enterMessageDetails(name, email, subject, message, file);
        await $("//*[@data-qa='submit-button']").click();
        await browser.pause(5000);
        await browser.acceptAlert();
        await $("//*[text()='Success! Your details have been submitted successfully.']").waitForDisplayed(5000);
        await browser.takeScreenshot();

        this.allureReporter.endStep();
    }

    async enterMessageDetails(name, email, subject, message, file){
        this.allureReporter.startStep(`Enter message information with details: name = ${name}, email = ${email}, subject = ${subject} and message = ${message}`);
        await $("//*[@data-qa='name']").setValue(name);
        await $("//*[@data-qa='email']").setValue(email);
        await $("//*[@data-qa='subject']").setValue(subject);
        await $("//*[@data-qa='message']").setValue(message);
        await browser.takeScreenshot();
        this.allureReporter.endStep();
    }
}

export default new ContactUs();