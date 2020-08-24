import HomePage from "../page_objects/pages/HomePage"
import LoginPage from "../page_objects/pages/LoginPage";
import LoginData from '../data/login.data';
import RestaurantPage from "../page_objects/pages/RestaurantPage";

describe("Saleperson test suite", ()=>{

    beforeEach(()=>{
        HomePage.open();
        HomePage.prepareHome();
    })

    describe("Login as saleperson amd navigate to my restaurant", ()=>{
        beforeEach(()=>{
            LoginPage.open();
            LoginPage.login(LoginData.salePerson, LoginData.passwordUniversal);
            expect(HomePage.cart).toBeDisplayed;
        })

        afterEach(()=>{
            browser.deleteAllCookies();
            browser.clearSessionStorage();
        })

        it("navigate to restaurant administration and check does link is shown - Issue #15148", ()=>{
            HomePage.menuComponent.openMenu();
            HomePage.menuComponent.openMyRestaurants();
            expect(browser.getUrl()).toContain("myrestaurants");
            RestaurantPage.clickOnFirstRestaurant();
            RestaurantPage.openRestauranInformation();
            RestaurantPage.openRestaurantAdministration();
            expect(RestaurantPage.getSalePersonButtonText().length).toBeGreaterThan(0);
        })
    })


})