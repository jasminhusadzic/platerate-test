import BasePage from "../BasePage";

class MenuComponent extends BasePage {
    get menuIcon(){return $("//header[@id='header']//i[contains(@class, 'sidenav-icon')]")};
    get menu(){return $("//div[contains(@class, 'sidenav-bg-main')]")};

    openMenu(){
        this.waitElementForDisplayed(this.menuIcon);
        this.menuIcon.click();
    }

}

export default new MenuComponent();