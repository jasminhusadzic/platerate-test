import HomePage from '../page_objects/pages/HomePage';
import LoginPage from '../page_objects/pages/LoginPage';
import SignUpPage from '../page_objects/pages/SignUpPage'
import ProfilePage from '../page_objects/pages/ProfilePage';
import LoginData from '../data/login.data';
import SearchData from '../data/search.data';
import RestaurantPage from '../page_objects/pages/RestaurantPage';
import {validAccountLogin} from '../data/credentials';
describe("home page suite", ()=>{
    beforeAll(()=>{
        HomePage.open();
        HomePage.prepareHome();
    });

    describe("search when user not logged", ()=>{

        it("search chicken from homepage and check load time", ()=>{
            let duration = HomePage.getSearchDuration(SearchData.chicken, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })

        it("search rice from result page and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            let duration = HomePage.getSearchDuration(SearchData.rice, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })

        it("switch tab to Restaurant then search thai and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.clickOnRestaurantTab();
            let duration = HomePage.getSearchDuration(SearchData.thai, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })

        it("switch tab to Food and Drink then search beef and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.clickOnRestaurantTab();
            HomePage.search(SearchData.thai, SearchData.city);
            HomePage.clickOnFoodAndDrinkTab();
            let duration = HomePage.getSearchDuration(SearchData.beef, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })

        it("open first result and check time load", ()=>{
            HomePage.search(SearchData.rice, SearchData.city);
            HomePage.clickOnRestaurantTab();
            let duration = HomePage.clickOnViewRestaurant();
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
            
        })

        it("open first result then click back and check load time", ()=>{
            HomePage.search(SearchData.rice, SearchData.city);
            HomePage.clickOnRestaurantTab();
            HomePage.clickOnViewRestaurant();
            let duration = HomePage.clickBackToResults(SearchData.rice);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })
    
    });

    describe("search when user is logged", ()=>{
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
        });
        
        it("search chicken from homepage and check load time", ()=>{
            let duration = HomePage.getSearchDuration(SearchData.chicken, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });

        it("search rice from result page and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            let duration = HomePage.getSearchDuration(SearchData.rice, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });

        it("switch tab to Restaurant then search thai and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.clickOnRestaurantTab();
            let duration = HomePage.getSearchDuration(SearchData.thai, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });

        it("switch tab to Food and Drink then search beef and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.clickOnRestaurantTab();
            HomePage.search(SearchData.thai, SearchData.city);
            HomePage.clickOnFoodAndDrinkTab();
            let duration = HomePage.getSearchDuration(SearchData.beef, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });

        it("open first results and check time load", ()=>{
            HomePage.search(SearchData.rice, SearchData.city);
            HomePage.clickOnRestaurantTab();
            let duration = HomePage.clickOnViewRestaurant();
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })

        it("open first result then click back and check load time", ()=>{
            HomePage.search(SearchData.rice, SearchData.city);
            HomePage.clickOnRestaurantTab();
            HomePage.clickOnViewRestaurant();
            let duration = HomePage.clickBackToResults(SearchData.rice);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })
    

    });
    
    describe("advanced search with food filter", ()=>{
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
        });

        xit("search chicken uncheck highest price in filter", ()=>{
            HomePage.clickOnSlider();
            expect(HomePage.filterHeading.getText()).toContain("FILTER");
            HomePage.checkHighestValue();
            let duration = HomePage.getSearchDuration(SearchData.chicken, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });


    });

    describe("open restaurant page when user not logged", ()=>{

        afterEach(()=>{
            if(HomePage.cart.isDisplayed()){
                ProfilePage.logout();
            } 
        });

        it("open restaurant page and check time load", ()=>{
            HomePage.search(SearchData.rice, SearchData.city);
            HomePage.clickOnRestaurantTab();
            let duration = HomePage.clickOnViewRestaurant();
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })
    });

    describe("open restaurant page when user is logged", ()=>{

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
        });

        it("open restaurant page and check time load", ()=>{
            HomePage.search(SearchData.rice, SearchData.city);
            HomePage.clickOnRestaurantTab();
            let duration = HomePage.clickOnViewRestaurant();
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })
    });

    describe("rate item", ()=>{
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
        });

        xit("select one item and rate", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.clickOnFoodAndDrinkTab();
            HomePage.searchResults.clickOnRate();
            HomePage.modalComponent.denyCredit();
            RestaurantPage.rateMenuItem();
            RestaurantPage.modalComponent.addToOrder();
            RestaurantPage.rateSelectedItem();
        });

    });
    
    describe("waqas tests", ()=>{

        it("search item with location enterd", ()=>{
            HomePage.searchItem(SearchData.chicken, SearchData.city);
            expect(HomePage.resultInfoHeader).toBeDisplayed;
        });

        it("should go to the About us page and verify the page title", ()=>{
            HomePage.gotoAboutUspage();
            expect(HomePage.aboutUsPageTitle.getText()).toContain('About us');
        });

        xit("should go to the Reward page and verify the page title", ()=>{
            HomePage.gotoRewardsPage();
            expect(HomePage.rewardPageTitle.getText()).toContain('PlateRate Rewards');
        });

        it("should go to the login page and verify the page title", ()=>{
            HomePage.goToLoginPage();
            expect(LoginPage.email).toBeDisplayed;
        });

        it("should go to the create account page and verify the page title", ()=>{
            HomePage.goToSignUpPage();
            expect(SignUpPage.signUpPageTitle.getText()).toContain('Create Account');
        });

        it("enter email and subscribe", ()=>{
            HomePage.subscribeAndGetUpdate(validAccountLogin);
            expect(HomePage.updatesAndOfferSuccessMessage.isDisplayed());
        });
    })
           
});