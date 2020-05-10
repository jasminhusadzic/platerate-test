import CommonPage from '../CommonPage'
 
class HomePage extends CommonPage {

    open(){
        super.open('/');
    }

    get filterIcon(){return $("//a[@href='#filter-form']/i")}
    get cart(){return $("//i[@class='fa fa-shopping-cart shopping_card']")};
    get filterHeading(){return $("h4=Filter")};
    get acceptCoockiesButton(){return $("#acceptCookies")};
    get neverPlay(){return $('strong*=play again')};
    get skipSplashScreenButton(){return $("(//div[contains(text(), 'Skip')])[2]")};
    get skipSplashScreenButtonStaging(){return $("(//div[contains(text(), 'Skip')])[3]")};
    get searchInput(){return $('#search')};
    get locationInput(){return $("//input[@name='locationinput']")};
    get resultInfoHeader(){return $("//div[@id='search_results_div']//div[contains(@style, 'display: block')]")};
    get searchButton(){return $('#searchbutton')};
    get loginButton(){return $('button*=Login/Register')};
    get restaurantTab(){return $("#restaurant")};
    get foodAndDrinkTab(){return $("#menuitem")};
    get highestValueCheck(){return $("//label[@for='checkboxValue']")};
    get viewRestaurantButton(){return $("(//a[contains(@class, 'view-venue-btn')])[1]")};
    get restaurantInformation(){return $("#accordionRestaurant")};

    clickOnSlider(){
        this.filterIcon.click();
    }

    acceptCoockies(){
        this.acceptCoockiesButton.click();
    }
    skipSplashScreen(){
        this.waitElementForDisplayed(this.skipSplashScreenButton);
        this.skipSplashScreenButton.click();
    }

    skipSplashScreenStaging(){
        this.waitElementForDisplayed(this.skipSplashScreenButtonStaging);
        this.skipSplashScreenButtonStaging.click()
    }

    getEnvironmentUrl(){
        return browser.getUrl();
    }

    clickNeverPlay(){
        this.neverPlay.click();
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

    search(searchTerm, location){
        this.searchInput.setValue(searchTerm);
        this.locationInput.setValue(location)
        //this.searchButton.click();
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


   
}


export default new HomePage();