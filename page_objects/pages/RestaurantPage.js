import CommonPage from "../CommonPage";

class RestaurantPage extends CommonPage {

    get rateItemButton(){return $("(//span[text()= 'Rate'])[1]//parent::button")};
    get rateSelectedItemButton(){return $("//span[contains(text(), 'Rate selected items')]")};
    get confirmInstructionsButton(){return $("#instruction-confirm")};
    get orderButton(){return $("(//button[contains(@class,'order-this-item')])[1]")};

    rateMenuItem(){
        this.waitElementForDisplayed(this.rateItemButton);
        this.rateItemButton.click();
    }

    rateSelectedItem(){
        this.waitElementForDisplayed(this.rateSelectedItemButton);
        this.rateSelectedItemButton.click();
    }

    confirmInstructions(){
        this.waitElementForDisplayed(this.confirmInstructionsButton);
        this.confirmInstructionsButton.click();
    }

    order(){
        this.waitElementForDisplayed(this.orderButton);
        this.orderButton.click();
    }

}

export default new RestaurantPage();