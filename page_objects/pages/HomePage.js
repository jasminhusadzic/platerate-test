import CommonPage from '../CommonPage'
import { generateEmail } from '../../data/credentials';

class HomePage extends CommonPage {

    open(){
        super.open('/');
    }

    get filterIcon(){return $("//a[@href='#filter-form']/i")}
    get cart(){return $("(//i[contains(@class, 'fa fa-shopping-cart shopping_card')])[1]")};
    get filterHeading(){return $("h4=Filter")};
    get acceptCoockiesButton(){return $("#acceptCookies")};
    get neverPlay(){return $('strong*=play again')};
    get modalWrapper(){return $("div.splashmobo")};
    get skipSplashScreenButton(){return $$("div.splashskip")[1]};
    get searchInput(){return $('#search')};
    get locationInput(){return $("#head-location-input-search")};
    get inputSwitch(){return $("//div[@class='inputSwitch']/span")}
    get clickLocationInput(){return $('div.inputSwitch')};
    get resultInfoHeader(){return $("//div[@id='search_results_div']//div[contains(@style, 'display: block')]")};
    get searchButton(){return $('#searchbutton')};
    get loginButton(){return $('button*=Login/Register')};
    get searchCTA(){return $('#head-search-button')};
    get loginCTA(){return $('#logoutNav')};
    get restaurantTab(){return $("//a[@data-key='restaurant']")};
    get foodAndDrinkTab(){return $("//a[@data-key='menuitem']")};
    get highestValueCheck(){return $("//label[@for='checkboxValue']")};
    get viewRestaurantButton(){return $("(//div[@class='item-detail-column'])[1]/a")};
    get restaurantInformation(){return $("//div[@class='restaurant_main_infor']")};
    get galleryAddressInput(){return $("#gallery-address")};
    get searchGalleryButton(){return $("#search-gallery")};
    get photoGalleryText(){return $("#photo-gallery-text")};
    get photoGallerySlider(){return $("#photo-gallery-search-radius-input")};
    get reviewsSlider(){return $("#radius-location")};
    get reviewsInput(){return $("#reviews-location")};
    get searchReviewsButton(){return $("//button[(contains(text(), 'Search'))]")};
    get searchReviewText(){return $("#search-reviews-text")};
    get denyLocationAccessButton(){return $('button.cancel')};
    get signUpButton(){return $('#head-signup');}
    get aboutUsButton(){return $('#head-about-us');}
    get aboutUsPageTitle(){return $("body > div.accord-box.mr-4.ml-4 > div > div > div > div > header")};
    get rewardButton(){return $('#head-rewards');}
    get rewardPageTitle(){return $('//h3[text()="PlateRate Rewards"]')};
    get updatesAndOffersEmial(){return $('#mce-EMAIL')};
    get updatesAndOffersSubmitButton(){return $('input[type=submit]')};
    get updatesAndOfferSuccessMessage(){return $('#mce-success-response')};
    get dontShowAgainButton(){return $("//button[@class='cancel']")};

    clickOnSlider(){
        this.filterIcon.click();
    }

    denyLocationAceess(){
        this.waitElementForDisplayed(this.denyLocationAccessButton);
        this.denyLocationAccessButton.click();
    }
    
    acceptCoockies(){
        this.acceptCoockiesButton.click();
    }
    skipSplashScreen(){
        this.waitElementForDisplayed(this.skipSplashScreenButton);
        this.skipSplashScreenButton.click();
        this.modalWrapper.waitForDisplayed({
            timeout: 10000,
            reverse: true,
            timeoutMsg: 'Now splash popup is gone'
        });
    }

    dontShowLocation(){
        try {
            this.waitElementForDisplayed(this.dontShowAgainButton);
            this.dontShowAgainButton.click();
        }catch(error){
            console.log('modal did not appear');
        }
        
    }

    prepareHome(){
        try {
            this.dontShowLocation();
            this.skipSplashScreen(); 
        }
        catch (error) {
            console.log('skipped the splash screen')
        }
        if(this.acceptCoockiesButton.isDisplayed())this.acceptCoockies(); 
    }

    clickOnRestaurantTab(){
        this.restaurantTab.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'restaurant tab did not appear'
        });
        this.restaurantTab.scrollIntoView(false);
        this.restaurantTab.click();
    }

    clickOnFoodAndDrinkTab(){
        this.foodAndDrinkTab.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'food and drink tab did not appear'
        });
        this.foodAndDrinkTab.scrollIntoView(false);
        this.foodAndDrinkTab.click();
    }

    clickOnViewRestaurant(){
        let startTime = new Date();
        browser.url(this.viewRestaurantButton.getAttribute('href'));
        browser.pause(3000);
        browser.waitUntil(
            ()=> this.restaurantInformation.isDisplayed(),
            {
                timeout: 120000,
                timeoutMsg: 'Restaurant page did not appear before 2 minutes'
            }
        )
        return((Date.now() - startTime)/1000);
    }

    clickBackToResults(searchTerm){
        let startTime = new Date();
        browser.back();
        browser.waitUntil(
            ()=> this.resultInfoHeader.getText().includes(searchTerm),
            {
                timeout: 120000,
                timeoutMsg: searchTerm + ' did not appear before 2 minutes'
            }
        );
        return((Date.now() - startTime)/1000);
    }

    search(searchTerm, location){
        this.searchInput.setValue(searchTerm);
        this.inputSwitch.doubleClick();
        browser.pause(2000);
        this.waitElementForDisplayed(this.locationInput);
        this.locationInput.addValue(location);
        browser.keys("\uE007");
        browser.waitUntil(
            ()=> this.resultInfoHeader.getText().includes(searchTerm),
            {
                timeout: 120000,
                timeoutMsg: searchTerm + ' did not appear before 2 minutes'
            }
        );
    }

    getSearchDuration(searchTerm, location){
        let startTime = new Date();
        if(searchTerm != null){
            this.search(searchTerm, location);
        }
        return ((Date.now() - startTime)/1000);
    }

    checkHighestValue(){
        this.highestValueCheck.click();
    }

    searchGalleryAddress(address){
        this.waitElementForDisplayed(this.galleryAddressInput);
        this.galleryAddressInput.setValue(address);
        this.waitElementForDisplayed(this.searchGalleryButton);
        this.searchGalleryButton.click();
    }

    getPhotoGalleryText(){
        this.waitElementForDisplayed(this.photoGalleryText);
        return this.photoGalleryText.getText();
    }

    moveGallerySlider(xOffset, yOffset){
        this.waitElementForDisplayed(this.photoGallerySlider);
        this.photoGallerySlider.moveTo(xOffset, yOffset);
        browser.positionClick(); 
    }

    moveReviewsSlider(xOffset, yOffset){
        this.waitElementForDisplayed(this.reviewsSlider);
        this.reviewsSlider.moveTo(xOffset, yOffset);
        browser.positionClick(); 
    }

    searchReviews(reviewsLocation){
        this.waitElementForDisplayed(this.reviewsInput);
        this.reviewsInput.setValue(reviewsLocation);
        this.waitElementForDisplayed(this.searchReviewsButton);
        this.searchReviewsButton.click();
    }

    getSearchReviewstext(){
        this.waitElementForDisplayed(this.searchReviewText);
        return this.searchReviewText.getText();
    }

    searchItem(item, location){
        this.clickLocationInput.click();
        this.locationInput.setValue(location);
        this.searchInput.setValue(item);
        this.searchCTA.click();
    }

    gotoAboutUspage(){
        this.aboutUsButton.click();
    }

    gotoRewardsPage(){
        this.rewardButton.click();
    }

    goToLoginPage(){
        this.loginCTA.click();
    }

    goToSignUpPage(){
        this.signUpButton.click();
    }

    subscribeAndGetUpdate({email = generateEmail}){
        this.updatesAndOffersEmial.scrollIntoView();
        this.updatesAndOffersEmial.setValue(email);
        this.updatesAndOffersSubmitButton.click();
        browser.pause(2000);
    }

   
}


export default new HomePage();