import CommonPage from '../CommonPage'
import HomePage from './HomePage'
import LoginPage from './LoginPage'


class ProfilePage extends CommonPage {
    
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
    get collapseHowYouLikeToEat() {return $("a[href='#collapseHowYouLikeEat']")};
    get collapseDietaryPreferences() {return $("a[href='#collapseTwo']")};
    get collapseSensoryExperience() {return $("a[href='#collapseTa']")};
    get collapseGroupDiningPreferences() {return $("a[href='#collapseGd']")};
    get collapseRestaurantPreferences() {return $("a[href='#collapseRp']")};
    get collapseNotificationPreferences() {return $("a[href='#collapseNotifications']")};
    get showMoreFoodQuality() {return $('#check_clicked_0')};
    get showMoreAllergies() {return $('#check_clicked_1')};
    get showMoreSpecialDiet() {return $('#check_clicked_2')};
    get noMSGSelect() {return $('#dietvalue_NoMSG')};
    get crueltyFreeSelect() {return $('#dietvalue_CrueltyFree')};
    get lowFatSelect() {return $('#dietvalue_LowFat')};
    get savePrefs() {return $('#save_dietaryPref')};
    get uncheckAllButton() {return $('[name="uncheckAll"]')}
    get unverifiedButtons() {return $("//a[contains(text(), 'Un-verified')]")};
    get orderHistoryTypeButtons(){return $$("//ul[contains(@class, 'OrdersHistorys-nav')]/li")};
    get contactInfoHeading(){return $("(//div[@id='collapseOne']//h4)[1]")};
    get streetAddress(){return $("#street")};
    get saveHomeAddressButton(){return $("//div[@id='saveBtn-1']//button[contains(text(), 'Save')]")};
    get profileSavedMessages(){return $("//div[@class='alert alert-success']")};
    get homeAddressLabel(){return $("//label[@class='adjust-adres-content']")};
    get bySmsCheckbox(){return $("#bySms")};
    get byEmailCheckbox(){return $("#byEmail")};
    get neverContactCheckbox(){return $("#never")};
    
    open(){
        super.open('/users/healthy-eating-profile');
    }

    logout(){
        browser.deleteCookie('session');
        browser.url('/users/login?next=/');
        browser.waitUntil(
            ()=> LoginPage.submitBtn.isDisplayed(),
            {
                timeout: 20000,
                timeoutMsg: "Button is not displayed"
            }
        );
    }

    preparePreferences() {
        this.clickElement(this.collapseHowYouLikeToEat);
    }

    waitForElementDisplayed(element){
        element.waitForDisplayed({
            timeout: 60000,
            timeoutMsg: 'Did not appear before 60 seconds'
        });
    }
    
    waitForElementNotDisplayed(element){
        element.waitForDisplayed({
            timeout: 60000,
            reverse: true,
            timeoutMsg: 'Did appear before 60 seconds'
        });
    }

    waitForElementClickable(element){
        element.waitForClickable({
            timeout: 60000,
            timeoutMsg: 'Did not appear before 60 seconds'
        })
    }
    

    waitForElementNotClickable(element){
        element.waitForClickable({
            timeout: 60000,
            reverse: true,
            timeoutMsg: 'Did not appear before 60 seconds'
        });
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
        this.clickElement(this.personalInformation);
    }
    
    clickOnNameEmailPhone(){
        this.clickElement(this.nameEmailPhone);
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
    
    generateRandomEmail(baseEmail){
        let r = Math.random().toString(36).substring(7);
        let email = baseEmail.replace("<replace>", r);
        return email;
    }
    
    addAditionalEmail(additionaEmail){
        let email = this.generateRandomEmail(additionaEmail);
        this.clickOnPersonalInformation();
        this.waitForElementDisplayed(this.nameEmailPhone);
        this.clickOnNameEmailPhone();
        this.waitForElementDisplayed(this.firstName); 
        this.additionalEmailButton.click();
        this.waitForElementDisplayed(this.additionalEmailInput);
        this.additionalEmailInput.setValue(email);
        this.saveAdditionalEmailButton.click();
        this.waitForElementDisplayed($("//input[@value='" + email + "' and @type='text']"));
    }
    
    countEmails(){
        let emails = browser.$$("#secondaryemail");
        return emails.length;
    }
    
    getCurrentUrl(){
        return browser.getUrl();
    }
    
    getContactInfoHeading(){
        this.waitElementForDisplayed(this.contactInfoHeading);
        return this.contactInfoHeading.getText();
    }
    
    insertStreetAddress(street){
        this.waitElementForDisplayed(this.streetAddress);
        this.streetAddress.setValue(street);
    }
    
    saveHomeAddress(){
        this.clickElement(this.saveHomeAddressButton);
    }
    
    waitForProfileSavedMessage(){
        this.waitElementForDisplayed(this.profileSavedMessages);
    }
    
    getHomeAddressLabel(){
        this.waitElementForDisplayed(this.homeAddressLabel);
        return this.homeAddressLabel.getText();
    }
    
    waitForAllergiesHidden() {
        this.noMSGSelect.waitForDisplayed({
            timeout: 6000,
            reverse: true,
            timeoutMsg: 'didnt work',
        });
    }

    getBySmsChecked() {
        return this.bySmsCheckbox.getAttribute("value");
    }

    getByEmailChecked() {
        return this.byEmailCheckbox.getAttribute("value");
    }

    getneverContactChecked() {
        return this.neverContactCheckbox.getAttribute("value");
    }
    

    getMSGPreferenceValue() {
        return this.noMSGSelect.getValue();
    }
    
    getCrueltyPreferenceValue() {
        return this.crueltyFreeSelect.getValue();
    }
    
    getFatPreferenceValue() {
        return this.lowFatSelect.getValue();
    }

    savePreferences() {
        this.waitForElementDisplayed(this.savePrefs);
        this.savePrefs.click();
    }
    
    setDietaryPreferences() {
        this.clickElement(this.collapseDietaryPreferences);
        this.selectOption(this.noMSGSelect, 'Mostly');
        this.selectOption(this.crueltyFreeSelect, 'Mostly');
        this.selectOption(this.lowFatSelect, 'Mostly');
        this.savePreferences();
    }

    clearDietaryPreferences() {

        this.clickElement(this.uncheckAllButton);
        this.savePreferences();
    }
}

export default new ProfilePage();