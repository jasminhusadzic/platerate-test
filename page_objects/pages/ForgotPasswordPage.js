class ForgotPassowrd {

    open() {
        browser.url('/users/password/reset');
        browser.maximizeWindow();
    }

    get pageTitle(){
        return $("//h3[contains(text(), 'Forgot your password?')]");
    }
    get forgotPasswordEmail() {
        return $('input[placeholder=Email]');
    }

    get forgotPasswordSubmitBtn() {
        return $('body > div.parent-wrapper-container > div > div > div > div > div > div > div > div > form > div:nth-child(3) > button');
    }

    get forgotPasswordErrorMessage() {
        return $('#alert');
    }

    get resetPasswordLinkIsSent() {
        return $('body > div.container > div > div');
    }

    get okBtn() {
        return $('#body > div.container > div > a');
    }

    get backToLoginPage() {
        return $('body > div.parent-wrapper-container > div > div > div > div > div > div > a');
    }

    isOnPage(){
        expect(this.pageTitle.getText()).toContain('Forgot your password?');
        this.forgotPasswordEmail.isDisplayed();
        this.forgotPasswordSubmitBtn.isDisplayed();
    }

    wrongFormatEmail({ wrongEmail }) {
        this.forgotPasswordEmail.setValue(wrongEmail);
        this.forgotPasswordSubmitBtn.click();
        browser.pause(2000);
    }
    goBackToLoginPage() {
        this.backToLoginPage.click();
    }
    notRegisteredEmail({ notRegisteredEmail }) {
        this.forgotPasswordEmail.setValue(notRegisteredEmail);
        this.forgotPasswordSubmitBtn.click();
    }
    enterValidEmail({ email }) {
        this.forgotPasswordEmail.setValue(email);
        this.forgotPasswordSubmitBtn.click();
    }
}
export default new ForgotPassowrd();