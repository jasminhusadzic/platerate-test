import CommonPage from "../CommonPage";

class RestaurantPage extends CommonPage {

    get rateItemButton(){return $("(//span[text()= 'Rate'])[1]//parent::button")};
    get rateSelectedItemButton(){return $("//span[contains(text(), 'Rate selected items')]")};
    get confirmInstructionsButton(){return $("#instruction-confirm")};
    get orderButton(){return $("(//button[contains(@class,'order-this-item')])[1]")};
    get orderSpinLoader(){return $("//button[contains(@id, 'checkout-or-goto-order')]//i[contains(@class, 'fa fa-refresh fa-spin')]")};
    get myOrderButton(){return $("//button[@id='checkout-or-goto-order']")};

    rateMenuItem(){
        this.waitElementForDisplayed(this.rateItemButton);
        this.rateItemButton.click();
    }

    rateSelectedItem(){
        this.waitElementForDisplayed(this.rateSelectedItemButton);
        this.rateSelectedItemButton.click();
    }

    confirmInstructions(){
        try{
            this.waitElementForDisplayed(this.confirmInstructionsButton);
            this.confirmInstructionsButton.click();
        } catch (err){
            console.log(err);
        }
        
    }

    order(){
        this.waitElementForDisplayed(this.orderButton);
        this.orderButton.click();
    }

    isElementHidden(){
        this.waitElementForDisplayed(this.orderSpinLoader);
        if(this.orderSpinLoader.getCSSProperty('display') == 'inline-block'){
            return false;
        }else if (this.orderSpinLoader.getCSSProperty('display') == 'none'){
            return true;
        }
    }

    waitForOrderComplete(){
        browser.waitUntil(
            ()=> this.isElementHidden() === true,
            {
                timeout: 180000,
                timeoutMsg: "Loader is not disapear"
            }
        )
    }

    clickOnMyOrder(){
        this.waitElementForDisplayed(this.myOrderButton);
        this.myOrderButton.click();
    }

}

export default new RestaurantPage();