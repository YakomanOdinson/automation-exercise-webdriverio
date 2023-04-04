import basePage from "./base.page";

class SignUp extends basePage{

    async createAccount(title, name, email, password, birthDay, birthMonth, birthYear, newsletterCheck, specialOferrsCheck, firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber){
        this.allureReporter.startStep(`Create new account`);

        await this.enterAccountInformation(title, name, email, password, birthDay, birthMonth, birthYear, newsletterCheck, specialOferrsCheck);
        await this.enterAddressInformation(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber);
        await $("//button[@data-qa='create-account']").click();
        await this.waitPageTitleToBe("Automation Exercise - Account Created", 5000);
        await $("//*[@data-qa='continue-button']").click();
        await this.waitPageTitleToBe("Automation Exercise", 5000);

        this.allureReporter.endStep();
    }

    async enterAccountInformation(title, name, email, password, birthDay, birthMonth, birthYear, newsletterCheck, specialOferrsCheck){
        this.allureReporter.startStep(`Enter account information with details: Title = ${title}, name = ${name}, email = ${email}, password = ${password}, birthDay = ${birthDay}, birthMonth = ${birthMonth}, birthYear = ${birthYear}, newsletterCheck = ${newsletterCheck} and specialOffersCheck = ${specialOferrsCheck}`);
        await $(`//input[@value='${title}']`).click();
        await $("//input[@data-qa='name']").setValue(name);
        await $("//input[@data-qa='password']").setValue(password);

        const expectedObjectFound = await this.checkObjectDisplayed(`//input[@data-qa='email'][@disabled][@value='${email}']`);

        await $("//select[@data-qa='days']").selectByVisibleText(birthDay);
        await $("//select[@data-qa='months']").selectByVisibleText(birthMonth);
        await $("//select[@data-qa='years']").selectByVisibleText(birthYear);

        if (newsletterCheck === true) await $("//input[@id='newsletter']").click();
        if (specialOferrsCheck === true) await $("//input[@id='optin']").click();

        await browser.takeScreenshot();
        this.allureReporter.endStep(expectedObjectFound ? "passed" : "failed");
    }

    async enterAddressInformation(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber){
        this.allureReporter.startStep(`Enter address information with details: firstName = ${firstName}, lastName = ${lastName}, company = ${company}, address1 = ${address1}, address2= ${address2}, country = ${country}, state = ${state}, city = ${city}, zipcode = ${zipcode} and mobileNumber = ${mobileNumber}`);
        await $("//input[@data-qa='first_name']").setValue(firstName);
        await $("//input[@data-qa='last_name']").setValue(lastName);
        await $("//input[@data-qa='company']").setValue(company);
        await $("//input[@data-qa='address']").setValue(address1);
        await $("//input[@data-qa='address2']").setValue(address2);
        
        await $("//select[@data-qa='country']").selectByVisibleText(country);
        
        await $("//input[@data-qa='state']").setValue(state);
        await $("//input[@data-qa='city']").setValue(city);
        await $("//input[@data-qa='zipcode']").setValue(zipcode);
        await $("//input[@data-qa='mobile_number']").setValue(mobileNumber);

        await browser.takeScreenshot();
        this.allureReporter.endStep();
    }
}

export default new SignUp();