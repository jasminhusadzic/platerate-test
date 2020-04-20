import Page from '../Page'
import HomePage from './HomePage';

class LoginPage extends Page {

    get email() {return $('#email');}
    get password() {return $('#password');}
    get submitBtn() {return $('button[type=submit]');}
    get alertMessage() {return $('#error');}
    get facebookButton() {return $('#btn-login-facebook')};
    get facebookEmail() {return $('#email')};
    get facebookPassword() {return $('#pass')};
    get facebookLogIn() {return $('#loginbutton')};
    
    open(){
        super.open('users/login?next=/');
    }

    login(email, password){
        this.email.setValue(email);
        this.password.setValue(password);
        this.submitBtn.click();
    }

    waitForCart(){
        HomePage.cart.waitForDisplayed({
            timeout: 20000,
            timeoutMsg: "Cart is not displayed in 20 seconds"
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