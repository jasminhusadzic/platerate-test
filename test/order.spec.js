import HomePage from "../page_objects/pages/HomePage";
import SearchData from '../data/search.data';
import LoginData from '../data/login.data';
import RestaurantPage from "../page_objects/pages/RestaurantPage";
import LoginPage from "../page_objects/pages/LoginPage";
import ProfilePage from "../page_objects/pages/ProfilePage";
import SearchResults from "../page_objects/components/SearchResults";
import SignUpPage from "../page_objects/pages/SignUpPage";
import LocalStorageWorker from "../page_objects/localStorage/LocalStorageWorker";
import WebMailPage from "../page_objects/pages/WebMailPage";

describe("orders", ()=>{
    
    beforeAll(()=>{
        HomePage.open();
        HomePage.prepareHome();
        LoginPage.open();
    });


    it("create new user for test orders", ()=>{
        SignUpPage.createNewUser();
        expect(ProfilePage.getNewUserAlertText()).toContain('Please add a first name and last name to your profile');
    })

    // describe("order item with pickup when user not logged", ()=>{
    //     it("add order from Marcello's and select pickup",()=>{
    //         HomePage.search(SearchData.marchello, SearchData.marchelloLocation);
    //         HomePage.clickOnRestaurantTab();
    //         HomePage.clickOnViewRestaurant();
    //         RestaurantPage.confirmInstructions();
    //         RestaurantPage.order();
    //         RestaurantPage.modalComponent.addToOrder();
    //         LoginPage.login(LoginData.email, LoginData.password);
    //         LoginPage.waitForCart();
    //         RestaurantPage.modalComponent.selectPickup();
    //         RestaurantPage.waitForOrderComplete();
    //         browser.pause(5000);
    //     });

    // })

    // describe("order item with pickup when user is logged", ()=>{
    //     beforeEach(()=>{
    //         LoginPage.open();
    //         LoginPage.login(LoginData.email, LoginData.password);
    //         LoginPage.waitForCart();
    //         expect(HomePage.cart).toBeDisplayed;
    //     });

    //     afterEach(()=>{
    //         if(HomePage.cart.isDisplayed()){
    //             ProfilePage.logout();
    //         }
    //         browser.deleteAllCookies();
    //         browser.clearSessionStorage();
    //     });
        
    //     it("add order from Marcello's page and select pickup with tip later",()=>{
    //         HomePage.search(SearchData.marchello, SearchData.marchelloLocation);
    //         HomePage.clickOnRestaurantTab();
    //         HomePage.clickOnViewRestaurant();
    //         RestaurantPage.confirmInstructions();
    //         RestaurantPage.order();
    //         RestaurantPage.modalComponent.addToOrder(); 
    //         RestaurantPage.waitForOrderComplete();
    //         //RestaurantPage.modalComponent.selectPickup();
    //         RestaurantPage.clickOnMyOrder();
    //     });

    //     it("add order from result page and select pickup with tip later",()=>{
    //         HomePage.search(SearchData.marchello, SearchData.marchelloLocation);
    //         HomePage.clickOnFoodAndDrinkTab();
    //         HomePage.searchResults.clickOnOrder();

    //     });

    // })

    describe("add order and pay with paypal", ()=>{
        beforeEach(()=>{
            if(HomePage.cart.isDisplayed()){
                ProfilePage.logout();
            }
        });


        it("search for Marcello restaurant, add order and pay with paypal with new created user", ()=>{
            LoginPage.open();
            LoginPage.login(LocalStorageWorker.getLocalStorage('email'), LoginData.password);
            LoginPage.waitForCart();
            HomePage.search(SearchData.marchello, SearchData.marchelloLocation);
            SearchResults.openRestaurant();
            RestaurantPage.orderTest();
            RestaurantPage.modalComponent.addToOrder();
            RestaurantPage.modalComponent.selectPickup();
            RestaurantPage.orderComponent.clickPay();
            expect(browser.getUrl()).toContain('https://www.sandbox.paypal.com/');
        })
    })

})