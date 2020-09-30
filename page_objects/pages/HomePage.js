import CommonPage from '../CommonPage'
import { generateEmail } from '../../data/credentials';
import SearchData from '../../data/search.data';

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
    get skipSplashScreenButton(){return $("#first-splashskip")};
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
    get filterLocals(){return $("div.filter_locals_rating")};
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
    get aboutUsPageTitle(){return $("//header//b")};
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
        try {
            this.waitElementForDisplayed(this.acceptCoockiesButton);
            this.acceptCoockiesButton.click();
        } catch (e) {
            console.log('coockies did not appear')
        }
        
    }

    skipSplashScreen(){
        try {
            this.waitElementForDisplayed(this.skipSplashScreenButton);
            this.skipSplashScreenButton.click();
            this.modalWrapper.waitForDisplayed({
                timeout: 6000,
                reverse: true,
                timeoutMsg: 'Now splash popup is gone'
            });
        }
        catch (error) {
            console.log('skipped the splash screen')
        }
    }

    dontShowLocation(){
        try {
            this.clickElement(this.dontShowAgainButton);
        }catch(error){
            console.log('modal did not appear');
        }
        this.dontShowAgainButton.waitForDisplayed({
            timeout: 6000,
            reverse: true,
            timeoutMsg: 'Now splash popup is gone'
        });
    }

    prepareHome(){
        this.dontShowLocation();
        browser.pause(500);
        this.acceptCoockies(); 
        browser.pause(500);
        this.skipSplashScreen();
    }

    cartIsDisplayed() {
        this.waitElementForDisplayed(this.cart);
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

    openTestRestaurant() {
        this.search(SearchData.marchello, SearchData.marchelloLocation);
        // filterLocals makes it easier to scroll restaurant tab into view
        // this.dontShowLocation();
        this.filterLocals.scrollIntoView();
        this.clickOnRestaurantTab();
        this.clickOnViewRestaurant();
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