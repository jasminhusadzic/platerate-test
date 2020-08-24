import CommonPage from "../CommonPage";

class RestaurantPage extends CommonPage {

    get rateItemButton(){return $("(//span[text()= 'Rate'])[1]//parent::button")};
    get rateSelectedItemButton(){return $("//span[contains(text(), 'Rate selected items')]")};
    get confirmInstructionsButton(){return $("#instruction-confirm")};
    get orderButton(){return $("(//button[contains(@class,'order-this-item')])[1]")};
    get orderSpinLoader(){return $("//button[contains(@id, 'checkout-or-goto-order')]//i[contains(@class, 'fa fa-refresh fa-spin')]")};
    get myOrderButton(){return $("//button[@id='checkout-or-goto-order']")};
    get viewButton(){return $("(//td/a[contains(text(), 'View')])[1]")};
    get restaurantInformation(){return $("//div[@id='restaurant-infor']")};
    get restaurantPicture(){return $("#venue-gallery")};
    get restaurantAdministration(){return $("#accordion-restarant-admin")};
    get salePersonButton(){return $("//div[@id='restaurantAdmin']//div[@id='serverDiv2']//button[@name='email_salesperson']")};
    get firstItem(){return $("(//div[contains(@class, 'order-this-item')])[1]/a")};
    get menuSearchInput(){return $("#menu-search")};

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
    // Method order will be deprecated
    order(){
        this.waitElementForDisplayed(this.orderButton);
        this.orderButton.click();
    }
    
    orderTest(){
        this.waitElementForDisplayed(this.firstItem);
        this.menuSearchInput.scrollIntoView();
        this.firstItem.click();
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

    clickOnFirstRestaurant(){
        this.waitElementForDisplayed(this.viewButton);
        this.viewButton.click();
    }

    openRestauranInformation(){
        this.waitElementForDisplayed(this.restaurantInformation);
        this.restaurantPicture.scrollIntoView();
        this.restaurantInformation.click();
    }

    openRestaurantAdministration(){
        this.waitElementForDisplayed(this.restaurantAdministration);
        browser.pause(1000);
        this.restaurantAdministration.click();
    }

    getSalePersonButtonText(){
        this.waitElementForDisplayed(this.salePersonButton);
        this.salePersonButton.scrollIntoView();
        return this.salePersonButton.getText();
    }

}

export default new RestaurantPage();