import homePage from "../../pageObjects/automation-exercise/home.page";
import productDetailsPage from "../../pageObjects/automation-exercise/product-details.page";
import cartPage from "../../pageObjects/automation-exercise/cart.page";
import loginPage from "../../pageObjects/automation-exercise/login.page";
import signupPage from "../../pageObjects/automation-exercise/signup.page";
import checkoutPage from "../../pageObjects/automation-exercise/checkout.page";
import paymentPage from "../../pageObjects/automation-exercise/payment.page";
import contactUsPage from "../../pageObjects/automation-exercise/contact-us.page";

describe('Automation Exercise', () => {
    
    it('E2E - Multiple flows', async() => {
        await homePage.open();
        await homePage.viewProductDetails("Pure Cotton Neon Green Tshirt");
        await productDetailsPage.addProductQuantityToCart(30);
        await cartPage.validateCartProducts("Pure Cotton Neon Green Tshirt", 30);
        await cartPage.newUserGoToCheckout();
        const newEmail = await loginPage.signUp("Tester", "testerino@mailerino.com");
        await signupPage.createAccount("Mr", "Tester", newEmail, "password", 31, "December", 1990, true, false, "Tester", "Smith", "TestCompany Inc.", "fake street 123", "Lomas del Test", "Canada", "Nuevo Leon", "Monterrey", 64602, 8181818181);
        await homePage.navBar.goToCart();
        await cartPage.validateCartProducts("Pure Cotton Neon Green Tshirt", 30);
        await cartPage.existingUserGoToCheckout();
        await checkoutPage.placeOrder("Test comment");
        await paymentPage.payConfirmOrder("Test Card Name", 123456789, 777, 12, 2028);
        await homePage.navBar.logout();
        await loginPage.logIntoAccount(newEmail, "password", "Tester");
        await homePage.navBar.goToContactUs();
        await contactUsPage.sendMessage("Tester", newEmail, "Test Subject", "Test Message Contact Us");
        await homePage.navBar.logout();
    });
});