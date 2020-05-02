
class SearchResults {

    get rateButton(){return $("(//button[contains(@class, 'btn-rate rate-item-home')])[1]")};

    
    clickOnRate(){
        this.rateButton.click();
    }

}

export default new SearchResults();