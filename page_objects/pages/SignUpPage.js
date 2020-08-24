import { generateEmail } from '../../data/credentials';

class SignUpPage {

    open() {
        browser.url('users/register');
        browser.maximizeWindow();
    }

    //Selectors 

    get signUpPageTitle(){
        return $('//h3[text()="Create Account"]');
    }
    get enterEmail() {
        return $('#email');
    }

    get enterMobileNumber() {
        return $('#phone');
    }

    get createAccountBtn() {
        return $('#form-registration > div:nth-child(5) > button');
    }

    get confirmationTick() {
        return $('body > div.sweet-alert.showSweetAlert.visible > div.sa-icon.sa-success.animate');
    }

    get phoneNumErrorMessage() {
        return $('#error')
    }

    get registrationSuccessBtn() {
        return $('body > div.container > div > a');
    }

    get registrationOkBtn() {
        return $("//button[contains(text(), 'Ok')]");
    }

    get sendCodeAgain(){
        return $('#btn-send-to');
    }

    get confirmCode(){
        return $('#btn-confirm');
    }
    
    //Login with facebook 

    get facebookBtn() {
        return $('#form-registration > a.btn.btn-facebook.btn-new-facebook > img')
    }

    get facebookLoginePageheader() {
        return $('#header_block');
    }

    get facebookEmailField() {
        return $('#email');
    }

    get facebookPasswordField() {
        return $('#pass');
    }

    get facebookLoginBtn() {
        return $('#loginbutton');
    }

    get facebookPermissionBox() {
        return $('#permissions_list');
    }

    get facebookContinueBtn() {
        return $('#u_0_14 > div._58xh._1flz > div._1fl- > div._2mgi._4k6n > button');
    }

    // Gamil login 

    get gmailBtn() {
        return $('#btn-login-google');
    }

    get gmailInputEmail() {
        return $('#identifierId');
    }
    get gmailNextBtn() {
        return $('#identifierNext > span');
    }

    get gmailPasswordInput() {
        return $('input[type=password]');
    }

    get gmailPasswordNextBtn() {
        return $('#passwordNext > span');
    }

    get cart() {
        return $('#shopping_cart_btn > span > i');
    }

    submitValidCredentials({ email = generateEmail()}) {
        this.enterEmail.setValue(email);
        this.createAccountBtn.click();
        this.registrationOkBtn.click();
        this.registrationSuccessBtn.click();
    }

    createAccountWithPhoneNumber({ mobilePhone }) {
        this.enterMobileNumber.setValue(mobilePhone);
        this.createAccountBtn.click();
    }

    submitWrongCredentials({ wrongEmail, wrongPhoneNumber }) {
        this.enterMobileNumber.setValue(wrongPhoneNumber);
        this.createAccountBtn.click();
    }

    loginWithFacebook({ fbEmail, fbPassword }) {
        this.facebookBtn.click();
        expect(this.facebookLoginePageheader.getText()).toContain('Log Into Facebook');
        this.facebookEmailField.setValue(fbEmail);
        this.facebookPasswordField.setValue(fbPassword);
    }

    continuewithFacebook() {
        this.facebookLoginBtn.click();

        if (this.facebookContinueBtn.isDisplayed()) {
            expect(this.facebookPermissionBox.getText()).toContain('name and profile picture and email address');
            this.facebookContinueBtn.click();
        }
    }
    
    goTOGmail() {
        this.gmailBtn.click();}
}

export default new SignUpPage();