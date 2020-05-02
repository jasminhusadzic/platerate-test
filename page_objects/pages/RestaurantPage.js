import CommonPage from "../CommonPage";

class RestaurantPage extends CommonPage {

    get rateItemButton(){return $("(//span[text()= 'Rate'])[1]//parent::button")};

    rateMenuItem(){
        this.waitElementForDisplayed(this.rateItemButton);
        this.rateItemButton.click();
    }

}

export default new RestaurantPage();