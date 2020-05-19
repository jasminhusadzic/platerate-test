import BasePage from "../BasePage";

class ModalComponent extends BasePage {

    get modalCreditDeny(){return $("//div[@id='footer-model-instruction']/button[1]")};
    get addToOrderButton(){return $("//button[@id='add-to-order']")};
    get pickupButton(){return $("#pickup-type")};

    denyCredit(){
        this.waitElementForDisplayed(this.modalCreditDeny);
        this.modalCreditDeny.click();      
    }

    addToOrder(){
        this.waitElementForDisplayed(this.addToOrderButton);
        this.addToOrderButton.click();
    }

    selectPickup(){
        try{
            this.waitElementForDisplayed(this.pickupButton);
            this.pickupButton.click();
        }
        catch(err){
            console.log(err);
        }
        
    }
    
}

export default new ModalComponent();