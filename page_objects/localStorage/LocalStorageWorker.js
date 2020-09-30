const { default: BasePage } = require("../BasePage");

class LocalStorage extends BasePage {

    setLocalStorage(value){
        browser.setLocalStorage("email", value);
    }

    getLocalStorage(key){
        return browser.getLocalStorageItem(key);
    }

}

export default new LocalStorage();