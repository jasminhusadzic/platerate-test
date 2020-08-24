import BasePage from "../BasePage";

class SearchResults extends BasePage {

    get rateButton(){return $("(//button[contains(@class, 'btn-rate rate-item-home')])[1]")};
    get addToOrderButton(){return $("(//div[contains(@class, 'menuItemsId')]//button[contains(@class, 'btn-cart')])[1]")};
    get restaurant(){return $("(//a[@id='venue-name font-18'])[1]")}
    get restaurantMenuHeader(){return $("#favorites-menu")};

    
    clickOnRate(){
        this.waitElementForDisplayed(this.rateButton);
        this.rateButton.click();
    }

    clickOnOrder(){
        this.waitElementForDisplayed(this.addToOrderButton);
        this.addToOrderButton.click();
    }

    openRestaurant(){
        let startTime = new Date();
        browser.url(this.restaurant.getAttribute('href'));
        browser.pause(3000);
        browser.waitUntil(
            ()=> this.restaurantMenuHeader.isDisplayed(),
            {
                timeout: 120000,
                timeoutMsg: 'Restaurant page did not appear before 2 minutes'
            }
        )
        return((Date.now() - startTime)/1000);

    }

}

export default new SearchResults();