import basePage from "./base.page";

class Login extends basePage{

    async signUp(name, email){
        const timestamp = Date.now();
        const newEmail = timestamp + email; //This to avoid error because account already exists
        this.allureReporter.startStep(`Sign up new user with name = ${name} and email = ${newEmail}`);
        await $("//input[@data-qa='signup-name']").setValue(name);
        await $("//input[@data-qa='signup-email']").setValue(newEmail);
        await browser.takeScreenshot();
        await $("//button[@data-qa='signup-button']").click();
        await this.waitPageTitleToBe("Automation Exercise - Signup", 5000);

        this.allureReporter.endStep();
        return newEmail;
    }

    async logIntoAccount(email, password, name){
        
        this.allureReporter.startStep(`Login with email = ${email} and password = ${password}. Expected name of the account: ${name}`);
        
        await $("//*[@data-qa='login-email']").setValue(email);
        await $("//*[@data-qa='login-password']").setValue(password);
        await browser.takeScreenshot();
        await $("//*[@data-qa='login-button']").click();
        await this.waitPageTitleToBe("Automation Exercise", 5000);
        const expectedObjectFound = await this.checkObjectDisplayed(`//*[contains(text(),'Logged in as ')][.//*[text()='${name}']]`);
        
        this.allureReporter.endStep(expectedObjectFound ? "passed" : "failed");
    }
}

export default new Login();