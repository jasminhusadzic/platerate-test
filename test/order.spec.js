import HomePage from "../page_objects/pages/HomePage";
import SearchData from '../data/search.data';
import LoginData from '../data/login.data';
import RestaurantPage from "../page_objects/pages/RestaurantPage";
import LoginPage from "../page_objects/pages/LoginPage";
import ProfilePage from "../page_objects/pages/ProfilePage";
import SearchResults from "../page_objects/components/SearchResults";

describe("orders", ()=>{
    
    beforeEach(()=>{
        HomePage.open();
        HomePage.prepareHome();
    });

   
    describe("order item with pickup when user not logged", ()=>{


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
            RestaurantPage.waitForOrderComplete();
            browser.pause(5000);
        });

    })

    describe("order item with pickup when user is logged", ()=>{

        beforeEach(()=>{
            LoginPage.open();
            LoginPage.login(LoginData.email, LoginData.password);
            LoginPage.waitForCart();
            expect(HomePage.cart).toBeDisplayed;
        });

        afterEach(()=>{
            if(HomePage.cart.isDisplayed()){
                ProfilePage.logout();
            }
            browser.deleteAllCookies();
            browser.clearSessionStorage();
        });
        
        it("add order from Marcello's page and select pickup with tip later",()=>{
            HomePage.search(SearchData.marchello, SearchData.marchelloLocation);
            HomePage.clickOnRestaurantTab();
            HomePage.clickOnViewRestaurant();
            RestaurantPage.confirmInstructions();
            RestaurantPage.order();
            RestaurantPage.modalComponent.addToOrder(); 
            RestaurantPage.waitForOrderComplete();
            //RestaurantPage.modalComponent.selectPickup();
            RestaurantPage.clickOnMyOrder();
        });

        it("add order from result page and select pickup with tip later",()=>{
            HomePage.search(SearchData.marchello, SearchData.marchelloLocation);
            HomePage.clickOnFoodAndDrinkTab();
            HomePage.searchResults.clickOnOrder();

        });



    })

    describe("add order and pay with paypal", ()=>{
        
        beforeEach(()=>{
            LoginPage.open();
            LoginPage.login(LoginData.email, LoginData.password);
            LoginPage.waitForCart();
            expect(HomePage.cart).toBeDisplayed;
        });

        afterEach(()=>{
            if(HomePage.cart.isDisplayed()){
                ProfilePage.logout();
            }
            browser.deleteAllCookies();
            browser.clearSessionStorage();
        });

        fit("search for Marcello restaurant, add order and pay with paypal", ()=>{
            HomePage.search(SearchData.marchello, SearchData.marchelloLocation);
            SearchResults.openRestaurant();
            RestaurantPage.orderTest();
            RestaurantPage.modalComponent.addToOrder();
            RestaurantPage.modalComponent.selectPickup();
        })
    })

})