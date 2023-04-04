import allureReporter from "@wdio/allure-reporter"

class NavBarComponent {
    async goToCart(){
        await this.goToSection("Cart", "view_cart");
    }

    async logout(){
        await this.goToSection("Logout", "login");
    }

    async goToContactUs(){
        await this.goToSection("Contact us", "contact_us");
    }

    async goToSection(section, expectedValueInUrl){
        allureReporter.startStep(`Navigate to menu option ${section}. Expect url to contain ${expectedValueInUrl} after navigation`);
        await $(`//a[contains(text(),'${section}')]`).click();
        await expect(browser).toHaveUrlContaining(expectedValueInUrl);
        await browser.takeScreenshot();
        allureReporter.endStep();
    }
}

export default new NavBarComponent();