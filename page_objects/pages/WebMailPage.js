import CommonPage from "../CommonPage";

class WebMailPage extends CommonPage {

    get emailInput(){return $("#user")};
    get passwordIput(){return $("#pass")};
    get submitButton(){return $("//button[@type='submit']")};
    get generatedEmail(){return $("#email_ch_text")};
    get confirmRegistration(){return $("//a[contains(text(), '/users/register')]")};

    openWebMail(){
        browser.url('http://mail.platerate.com/webmail');
    }

    openTempWebmail(){
        browser.newWindow('https://emailfake.com/');
    }

    login(email, password){
        this.waitElementForDisplayed(this.emailInput);
        this.emailInput.setValue(email);
        this.passwordIput.setValue(password);
        this.waitElementForDisplayed(this.submitButton);
        this.submitButton.click();
    }

    getGeneratedEmail(){
        this.waitElementForDisplayed(this.generatedEmail);
        return this.generatedEmail.getText();
    }

    getCurrentUrl(){
        return browser.getUrl();
    }

    confirmWebMailRegistration(){
        this.waitElementForDisplayed(this.confirmRegistration);
        this.confirmRegistration.scrollIntoView();
        browser.newWindow(this.confirmRegistration.getText());
    }

}

export default new WebMailPage();