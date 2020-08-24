import BasePage from "../BasePage";

class AlertComponent extends BasePage {

    waitForLocation() {
        browser.waitUntil(
            ()=> browser.isAlertOpen() === true, 
            {
                timeout: 5000,
                timeoutMsg: 'Question for location should appear' 
            }
        )

    }

    acceptLocation() {
        
    }

    isAlertAppear() {
        return browser.isAlertOpen();
    }
}

export default new AlertComponent();