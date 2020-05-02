import BasePage from "../BasePage";

class ModalComponent extends BasePage {

    get modalCreditDeny(){return $("//div[@id='footer-model-instruction']/button[1]")};
    get addToOrderButton(){return $("#add-to-order")};

    denyCredit(){
        this.waitElementForDisplayed(this.modalCreditDeny);
        this.modalCreditDeny.click();      
    }

    addToOrder(){
        this.waitElementForDisplayed(this.addToOrderButton);
        this.addToOrderButton.click();
    }
    
}

export default new ModalComponent();