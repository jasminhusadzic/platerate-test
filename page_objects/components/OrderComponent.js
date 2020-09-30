
import BasePage from "../BasePage";

class OrderComponent extends BasePage {

    get payButton(){return $("//div[contains(@class, 'checkout-actions')]//button[@id='create-paypal-order']")};

    clickPay(){
        this.payButton.waitForDisplayed({
            timeout:30000,
            reverse: true,
            timeoutMsg: BasePage.timeoutMsg(this.payButton, true)
        })
        this.payButton.click();
    }

}

export default new OrderComponent();
