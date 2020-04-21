import HomePage from '../page_objects/pages/HomePage';
import LoginPage from '../page_objects/pages/LoginPage';
import ProfilePage from '../page_objects/pages/ProfilePage';

const TimelineReporter = require('wdio-timeline-reporter').default;

describe("home page suite", ()=>{
    beforeEach(()=>{
        HomePage.open();
        HomePage.acceptCoockiesButton.isDisplayed() ? HomePage.acceptCoockies() : console.log('nema kukija');
        HomePage.neverPlay.isDisplayed() ? HomePage.clickNeverPlay() : console.log('nema neverplay');    
    });

    // it("check food filter is opened on click", ()=>{
    //     HomePage.clickOnSlider();
    //     expect(HomePage.filterHeading.getText()).toContain("FILTER");
    // })

    it("search chicken and check load time when user is not logged in", ()=>{
        let duration = HomePage.getSearchDuration('chicken');
        expect(duration).toBeLessThanOrEqual(60);
        TimelineReporter.addContext({
            title: 'Search duration is',
            value: duration.toString() + " seconds"
          });
    })

    // it("search rice after we search for chicken and check load time when user is not logged in", ()=>{
    //     HomePage.search('chicken');
    //     let duration = HomePage.getSearchDuration('rice');
    //     expect(duration).toBeLessThanOrEqual(60);
    //     TimelineReporter.addContext({
    //         title: 'Search duration is',
    //         value: duration.toString() + " seconds"
    //       });
    // })
    // it("search chicken, search rice and search chicken again and check load time for last search when user is not logged in", ()=>{
    //     HomePage.search('chicken');
    //     HomePage.search('rice');
    //     let duration = HomePage.getSearchDuration('chicken');
    //     expect(duration).toBeLessThanOrEqual(60);
    //     TimelineReporter.addContext({
    //         title: 'Search duration is',
    //         value: duration.toString() + " seconds"
    //       });
    // })

    // it("search beef and check load time when user is not logged in", ()=>{
    //     let duration = HomePage.getSearchDuration('beef');
    //     expect(duration).toBeLessThanOrEqual(60);
    //     if(duration>=10){
    //         TimelineReporter.addContext('WARNING');
    //     }
    //     TimelineReporter.addContext({
    //         title: 'Search duration is',
    //         value: duration.toString() + " seconds"
    //       });
    // })

    // it("search chicken and check load time when user is logged in", ()=>{
    //     LoginPage.open();
    //     LoginPage.login('jasmin.husadzic@gmail.com', 'test123');
    //     LoginPage.waitForCart();
    //     expect(HomePage.cart).toBeDisplayed;
    //     let duration = HomePage.getSearchDuration('chicken');
    //     expect(duration).toBeLessThanOrEqual(60);
    //     TimelineReporter.addContext({
    //         title: 'Search duration is',
    //         value: duration.toString() + " seconds"
    //       });
    // })

    // it("search rice after we search for chicken and check load time when user is logged in", ()=>{
    //     LoginPage.open();
    //     LoginPage.login('jasmin.husadzic@gmail.com', 'test123');
    //     LoginPage.waitForCart();  
    //     expect(HomePage.cart).toBeDisplayed;
    //     HomePage.search('chicken');
    //     let duration = HomePage.getSearchDuration('rice');
    //     expect(duration).toBeLessThanOrEqual(60);
    //     TimelineReporter.addContext({
    //         title: 'Search duration is',
    //         value: duration.toString() + " seconds"
    //       });
    // })

    // it("search chicken, search rice and search chicken again and check load time for last search when user is logged in", ()=>{
    //     LoginPage.open();
    //     LoginPage.login('jasmin.husadzic@gmail.com', 'test123');
    //     LoginPage.waitForCart();
    //     expect(HomePage.cart).toBeDisplayed;
    //     HomePage.search('chicken');
    //     HomePage.search('rice');
    //     let duration = HomePage.getSearchDuration('chicken');
    //     expect(duration).toBeLessThanOrEqual(60);
    //     TimelineReporter.addContext({
    //         title: 'Search duration is',
    //         value: duration.toString() + " seconds"
    //       });
    // })

    // it("search beef and check load time when user is logged in", ()=>{
    //     LoginPage.open();
    //     LoginPage.login('jasmin.husadzic@gmail.com', 'test123');  
    //     expect(HomePage.cart).toBeDisplayed;
    //     let duration = HomePage.getSearchDuration('beef');
    //     expect(duration).toBeLessThanOrEqual(60);
    //     TimelineReporter.addContext({
    //         title: 'Search duration is',
    //         value: duration.toString() + " seconds"
    //       });
    // })

    afterEach(()=>{
        if(HomePage.cart.isDisplayed()){
            ProfilePage.logout();
        } 
    })

})