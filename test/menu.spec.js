import HomePage from "../page_objects/pages/HomePage"
import LoginPage from "../page_objects/pages/LoginPage";
import LoginData from '../data/login.data';
import SearchData from '../data/search.data';
import AboutPage from "../page_objects/pages/MenuPages/AboutPage";

describe("Hamburger menu test suite", ()=>{

    beforeEach(()=>{
        HomePage.open();
        HomePage.prepareHome();
    })

    describe("Finding food functions", ()=>{
        beforeEach(()=>{
            LoginPage.open();
            LoginPage.login(LoginData.email, LoginData.password);
            expect(HomePage.cart).toBeDisplayed;
        })

        afterEach(()=>{
            browser.deleteAllCookies();
            browser.clearSessionStorage();
        })

        it("search photo gallery for Suffern NY with minimum radius results should appear", ()=>{
            HomePage.menuComponent.openMenu();
            HomePage.menuComponent.openFindingFood();
            HomePage.menuComponent.openPhotoGallery();
            expect(browser.getUrl()).toContain("photogallery");
            HomePage.searchGalleryAddress(SearchData.marchelloLocation);
            expect(HomePage.getPhotoGalleryText()).toContain("Found");
        })

        it("search photo gallery for Suffern NT with 50 miles radis results should appear", ()=>{
            HomePage.menuComponent.openMenu();
            HomePage.menuComponent.openFindingFood();
            HomePage.menuComponent.openPhotoGallery();
            expect(browser.getUrl()).toContain("photogallery");
            HomePage.moveGallerySlider(50, 50);
            HomePage.searchGalleryAddress(SearchData.marchelloLocation);
            expect(HomePage.getPhotoGalleryText()).toContain("Found");
            
        })

        fit("search photo gallery for Suffern NT with maximum radis results should appear", ()=>{
            HomePage.menuComponent.openMenu();
            HomePage.menuComponent.openFindingFood();
            HomePage.menuComponent.openPhotoGallery();
            expect(browser.getUrl()).toContain("photogallery");
            HomePage.moveGallerySlider(100, 50);
            HomePage.searchGalleryAddress(SearchData.marchelloLocation);
            expect(HomePage.getPhotoGalleryText()).toContain("Found");
            
        })

        it("search firends and influencer reviews Suffern NY with minimum radius results should appear", ()=>{
            HomePage.menuComponent.openMenu();
            HomePage.menuComponent.openFindingFood();
            HomePage.menuComponent.openSearchFriends();
            expect(browser.getUrl()).toContain("influencerreviews");
            HomePage.searchReviews(SearchData.marchelloLocation);
            expect(HomePage.getSearchReviewstext()).toContain("Found");

        })

        it("search firends and influencer reviews Suffern NY with 50 miles radius results should appear", ()=>{
            HomePage.menuComponent.openMenu();
            HomePage.menuComponent.openFindingFood();
            HomePage.menuComponent.openSearchFriends();
            expect(browser.getUrl()).toContain("influencerreviews");
            HomePage.moveReviewsSlider(50,50);
            HomePage.searchReviews(SearchData.marchelloLocation);
            expect(HomePage.getSearchReviewstext()).toContain("Found");

        })

        it("search firends and influencer reviews Suffern NY with maximum radius results should appear", ()=>{
            HomePage.menuComponent.openMenu();
            HomePage.menuComponent.openFindingFood();
            HomePage.menuComponent.openSearchFriends();
            expect(browser.getUrl()).toContain("influencerreviews");
            HomePage.moveReviewsSlider(100,50);
            HomePage.searchReviews(SearchData.marchelloLocation);
            expect(HomePage.getSearchReviewstext()).toContain("Found");

        })

        it("search social media feeds", ()=>{
           
        })

    })

    describe("about menu item", ()=>{
        beforeEach(()=>{
            LoginPage.open();
            LoginPage.login(LoginData.email, LoginData.password);
            expect(HomePage.cart).toBeDisplayed;
        })

        afterEach(()=>{
            browser.deleteAllCookies();
            browser.clearSessionStorage();
        })

        it("open about platerate and check basic layout", ()=>{
            HomePage.menuComponent.openMenu();
            HomePage.menuComponent.openAbout();
            HomePage.menuComponent.openAboutPlateRate();
            AboutPage.waitElementForDisplayed(AboutPage.contentTitle);
            expect(AboutPage.getPageTitle()).toContain("About PlateRate");
        })

        it("open rewards and check basic layout", ()=>{
        
        })
    })


})