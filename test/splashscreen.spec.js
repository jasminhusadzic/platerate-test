import SplashScreen from '../page_objects/pages/SplashScreenPage';
import HomeScreen from '../page_objects/pages/HomePage';
import LoginPage from '../page_objects/pages/LoginPage';

describe('Splash Screen test cases', () => {

    beforeEach(() => {
        browser.deleteAllCookies();
        SplashScreen.open();
    });

    it('should verify Splash Screen appears, when user vist the site', () => {
        SplashScreen.isOnPage();
        expect(SplashScreen.isOnPage());
    });

    it('should click on the skip CTA and move to the home page ', () => {
        SplashScreen.isOnPage();
        SplashScreen.skipBtnClick();
        expect(HomeScreen.searchButton).toBeDisplayed;
    });

    it('should click on the next CTA and Verify the text on second Splash Screen', () => {
        SplashScreen.isOnPage();
        SplashScreen.clickNextBtn();
        expect(SplashScreen.backCTA).toBeDisplayed;
        expect(SplashScreen.learnMoreCTA).toBeDisplayed;
    });

    it('should go to final splash screen and go back to the first screen and then click skip button', () => {
        SplashScreen.isOnPage();
        SplashScreen.goToForthSplashScreen();
        browser.pause(3000);
        SplashScreen.goBackToFirstPage();
    });

    it('should go to final splash screen and go back to the Login Registration screen ', () => {
        SplashScreen.isOnPage();
        SplashScreen.goToForthSplashScreen();
        SplashScreen.goToLoginScreen();
        expect(LoginPage.email).toBeDisplayed;
    });


    afterEach(() => {
        browser.deleteAllCookies();
    })

});