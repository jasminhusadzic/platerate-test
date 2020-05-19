import CommonPage from '../CommonPage'
import HomePage from './HomePage';

class LoginPage extends CommonPage {

    get email() {return $('#email');}
    get password() {return $('#password');}
    get submitBtn() {return $('button[type=submit]');}
    get alertMessage() {return $('#error');}
    get facebookButton() {return $('#btn-login-facebook')};
    get facebookEmail() {return $('#email')};
    get facebookPassword() {return $('#pass')};
    get facebookLogIn() {return $('#loginbutton')};
    get createAccountButton() {return $("//button[contains(text(), 'Create Account')]")};
    get registrationSuccess() {return $("//h2[contains(text(), 'Registration Success!')]")};
    
    open(){
        super.open('users/login?next=/');
    }

    login(email, password){
        this.email.setValue(email);
        this.password.setValue(password);
        this.submitBtn.click();
    }

    createAccount(moment, name){
        this.createAccountButton.click();
        this.waitElementForDisplayed(this.email);
        this.email.setValue(moment+name+'@platerate.com');
        this.createAccountButton.click();
        this.waitElementForDisplayed(this.registrationSuccess);
    }

    waitForCart(){
        HomePage.cart.waitForDisplayed({
            timeout: 180000,
            timeoutMsg: "Cart is not displayed in 3 minutes"
        });
    }

    loginWithFacebook(email, password){
        this.facebookButton.click();
        expect(browser.getTitle()).toBe("Log into Facebook | Facebook");
        this.facebookEmail.setValue(email);
        this.facebookPassword.setValue(password);
        this.facebookLogIn.click();
    }

    submit(){
        this.submitBtn.click();
    }


}

export default new LoginPage();