import BasePage from "../BasePage";

class SearchResults extends BasePage {

    get rateButton(){return $("(//button[contains(@class, 'btn-rate rate-item-home')])[1]")};
    get addToOrderButton(){return $("(//div[contains(@class, 'menuItemsId')]//button[contains(@class, 'btn-cart')])[1]")};

    
    clickOnRate(){
        this.waitElementForDisplayed(this.rateButton);
        this.rateButton.click();
    }

    clickOnOrder(){
        this.waitElementForDisplayed(this.addToOrderButton);
        this.addToOrderButton.click();
    }

}

export default new SearchResults();