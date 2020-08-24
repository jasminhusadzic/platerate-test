import CommonPage from "../CommonPage";

class WebMailPage extends CommonPage {

    get emailInput(){return $("#user")};
    get passwordIput(){return $("#pass")};
    get submitButton(){return $("//button[@type='submit']")};

    openWebMail(){
        browser.url('http://mail.platerate.com/webmail');
    }

    login(email, password){
        this.waitElementForDisplayed(this.emailInput);
        this.emailInput.setValue(email);
        this.passwordIput.setValue(password);
        this.waitElementForDisplayed(this.submitButton);
        this.submitButton.click();
    }

}

export default new WebMailPage();