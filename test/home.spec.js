import HomePage from '../page_objects/pages/HomePage';
import LoginPage from '../page_objects/pages/LoginPage';
import ProfilePage from '../page_objects/pages/ProfilePage';
import LoginData from '../data/login.data';
import SearchData from '../data/search.data';

describe("home page suite", ()=>{
    beforeEach(()=>{
        HomePage.open();
        if(HomePage.acceptCoockiesButton.isDisplayed())HomePage.acceptCoockies();
        if(HomePage.neverPlay.isDisplayed())HomePage.clickNeverPlay();    
    });

    describe("search when user not logged", ()=>{

        xit("search chicken from homepage and check load time", ()=>{
            let duration = HomePage.getSearchDuration(SearchData.chicken, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })
        xit("search rice from result page and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            let duration = HomePage.getSearchDuration(SearchData.rice, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })

        xit("switch tab to Restaurant then search thai and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.clickOnRestaurantTab();
            let duration = HomePage.getSearchDuration(SearchData.thai, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })

        xit("switch tab to Food and Drink then search beef and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.clickOnRestaurantTab();
            HomePage.search(SearchData.thai, SearchData.city);
            HomePage.clickOnFoodAndDrinkTab();
            let duration = HomePage.getSearchDuration(SearchData.beef, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })
    
        xit("search rice from results and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            let duration = HomePage.getSearchDuration(SearchData.rice, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })
        xit("search chicken then search rice and then search chicken and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.search(SearchData.rice, SearchData.city);
            let duration = HomePage.getSearchDuration(SearchData.chicken, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })
    
        xit("search beef from homepage and check load time", ()=>{
            let duration = HomePage.getSearchDuration(SearchData.beef, SearchData.city);
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
        
        xit("search chicken from homepage and check load time", ()=>{
            let duration = HomePage.getSearchDuration(SearchData.chicken, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });

        xit("search rice from result page and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            let duration = HomePage.getSearchDuration(SearchData.rice, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });

        xit("switch tab to Restaurant then search thai and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.clickOnRestaurantTab();
            let duration = HomePage.getSearchDuration(SearchData.thai, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });

        xit("switch tab to Food and Drink then search beef and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.clickOnRestaurantTab();
            HomePage.search(SearchData.thai, SearchData.city);
            HomePage.clickOnFoodAndDrinkTab();
            let duration = HomePage.getSearchDuration(SearchData.beef, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });
    
        xit("search chicken from results and check load time", ()=>{
            HomePage.search(SearchData.rice, SearchData.city);
            let duration = HomePage.getSearchDuration(SearchData.chicken, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });

        xit("search chicken then search rice and then search chicken and check load time", ()=>{
            HomePage.search(SearchData.chicken, SearchData.city);
            HomePage.search(SearchData.rice, SearchData.city);
            let duration = HomePage.getSearchDuration(SearchData.chicken, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });
    
        xit("search beef from homepage and check load time", ()=>{
            let duration = HomePage.getSearchDuration(SearchData.beef, SearchData.city);
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        });

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
        it("open restaurant page and check time load", ()=>{
            HomePage.search(SearchData.rice, SearchData.city);
            HomePage.clickOnRestaurantTab();
            let duration = HomePage.clickOnViewRestaurant();
            expect(duration).toBeLessThanOrEqual(60);
            HomePage.reportDuration(duration);
        })
    });
    
})