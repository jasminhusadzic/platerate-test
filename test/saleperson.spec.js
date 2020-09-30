import HomePage from "../page_objects/pages/HomePage"
import LoginPage from "../page_objects/pages/LoginPage";
import LoginData from '../data/login.data';
import RestaurantPage from "../page_objects/pages/RestaurantPage";
import ProfilePage from "../page_objects/pages/ProfilePage";

describe("Saleperson test suite", ()=>{

    beforeAll(()=>{
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
            if(HomePage.cart.isDisplayed()){
                ProfilePage.logout();
            }
        })

        it("navigate to restaurant administration and check does link is shown - Issue #15148", ()=>{
            HomePage.menuComponent.openMenu();
            HomePage.menuComponent.openMyRestaurants();
            expect(browser.getUrl()).toContain("myrestaurants");
            RestaurantPage.clickOnFirstRestaurant();
            RestaurantPage.openRestauranInformation();
            RestaurantPage.openRestaurantAdministration();
            // git statexpect(RestaurantPage.getSalePersonButtonText().length).toBeGreaterThan(0);
            expect(RestaurantPage.restaurantAdminHeading.getText()).toContain('List your menu');
        })
    })


})