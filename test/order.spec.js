import HomePage from "../page_objects/pages/HomePage";
import SearchData from '../data/search.data';
import LoginData from '../data/login.data';
import RestaurantPage from "../page_objects/pages/RestaurantPage";
import LoginPage from "../page_objects/pages/LoginPage";

describe("order item with pickup", ()=>{

    beforeEach(()=>{
        HomePage.open();
        HomePage.prepareHome();
    });

    it("add order from Marcello's and select pickup",()=>{
        HomePage.search(SearchData.marchello, SearchData.marchelloLocation);
        HomePage.clickOnRestaurantTab();
        HomePage.clickOnViewRestaurant();
        RestaurantPage.confirmInstructions();
        RestaurantPage.order();
        RestaurantPage.modalComponent.addToOrder();
        LoginPage.login(LoginData.email, LoginData.password);
        LoginPage.waitForCart();
        RestaurantPage.modalComponent.selectPickup();
        browser.pause(5000);
    });

})