import BasePage from "../BasePage";

class SearchResults extends BasePage {

    get rateButton(){return $("(//button[contains(@class, 'btn-rate rate-item-home')])[1]")};

    
    clickOnRate(){
        this.waitElementForDisplayed(this.rateButton);
        this.rateButton.click();
    }

}

export default new SearchResults();