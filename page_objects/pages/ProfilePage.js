import Page from '../Page'
import HomePage from './HomePage'


class ProfilePage extends Page {
    
    get menuIcon() { return $("span[onclick='openNav()']")};
    get logoutButton() {return $("//a[contains(text(), 'Logout')]")};
    get profilePicture() {return $("#profilePicture")};
    get userName() {return $("//label[@for='namelabel']")};
    get personalInformation() {return $("//*[@id='headingPersonalInfo']/h4/a")};
    get nameEmailPhone() {return $("a[href='#collapseZero']")};
    get firstName() {return $("#firstName")};
    get lastName() {return $("#lastName")};
    get submitButton() {return $("(//button[contains(text(),'Save')])[3]")};
    get additionalEmailButton() {return $("#additional_email_add")};
    get saveAdditionalEmailButton() {return $("//button[contains(text(), 'Save Additional Email')]")};
    get additionalEmailInput() {return $("#additional_emails")};
    get unverifiedButtons() {return $("//a[contains(text(), 'Un-verified')]")};
    
    open(){
        super.open('/users/healthy-eating-profile');
    }

    logout(){
        browser.deleteCookie('session');
        browser.url('/');
        browser.waitUntil(
            ()=> HomePage.loginButton.isDisplayed(),
            {
                timeout: 20000,
                timeoutMsg: "Button is not displayed"
            }
        );
    }

    waitForElementDisplayed(element){
        browser.waitUntil(
            () => element.isDisplayed(),
            {
                timeout: 60000,
                timeoutMsg: 'Did not appear before 60 seconds'
            }
        );
    }

    waitforProfilePicture(){
        browser.waitUntil(
            () => this.profilePicture.isDisplayed(),
            {
                timeout: 60000,
                timeoutMsg: 'Picture did not appear before 60 seconds'
            }
        );
    }
    
    waitforUserName(){
        browser.waitUntil(
            () => this.userName.isDisplayed(),
            {
                timeout: 60000,
                timeoutMsg: 'User name did not appear before 60 seconds'
            }
        );
    }

    clickOnPersonalInformation(){
        this.waitForElementDisplayed(this.personalInformation);
        this.personalInformation.click();
    }

    clickOnNameEmailPhone(){
        this.waitForElementDisplayed(this.nameEmailPhone);
        this.nameEmailPhone.click();
    }

    changeNames(first, last){
        this.clickOnPersonalInformation();
        this.waitForElementDisplayed(this.nameEmailPhone);
        this.clickOnNameEmailPhone();
        this.waitForElementDisplayed(this.firstName);
        this.firstName.clearValue();
        this.firstName.setValue(first);
        this.lastName.clearValue();
        this.lastName.setValue(last);
        this.submitButton.click();
    }

    getButtonsCount(){
        console.log(browser.elements(selector));
    }

    addAditionalEmail(additionaEmail){
        this.clickOnPersonalInformation();
        this.waitForElementDisplayed(this.nameEmailPhone);
        this.clickOnNameEmailPhone();
        this.waitForElementDisplayed(this.firstName); 
        this.additionalEmailButton.click();
        this.waitForElementDisplayed(this.additionalEmailInput);
        this.additionalEmailInput.setValue(additionaEmail);
        this.saveAdditionalEmailButton.click();
        this.waitForElementDisplayed($("//input[@value='" + additionaEmail + "' and @type='text']"));
    }
}
export default new ProfilePage();