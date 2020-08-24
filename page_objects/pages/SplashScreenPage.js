class SplashScreen {

    open() {
        browser.url('/');
        browser.maximizeWindow();
    }

    get splashScreenDiv() {
        return $('div.splashmobo');
    }
    get splashScreenImage() {
        return $('div.splashimagemobo');
    }
    get skipCTA() {
        return $$("div.splashskip")[1]
    }
    get nextCTA() {
        return $('button.slick-next');
    }
    get backCTA() {
        return $('button.slick-prev');
    }
    get splashscreenImage() {
        return $('#advance-loader');
    }
    get learnMoreCTA() {
        return $('#ratelearnModal');
    }
    get closeCTA() {
        return $('#mainsplashpopup > div > button.slick-next');
    }
    get loginAndRegistrationCTA() {
        return $('#logoutNavvideo');
    }
    get thirdSplashPage() {
        return $('#mainsplashpopup > div > div > div > div.slick-slide.slick-active > div > div.splasdeskright > div.pickupdelivery > div > div.col-md-12.mt-3 > span');
    }
    get closeButton() {
        return $('div.closescreen splashskip');
    }
    get homePage() {
        return $('#intro');
    }

    skipBtnClick() {
        this.skipCTA.click();
    }

    clickNextBtn() {
        this.nextCTA.click();
    }

    isOnPage() {
        this.splashScreenDiv.isDisplayed();
        this.splashScreenImage.isDisplayed();
        this.skipCTA.isDisplayed();
    }

    goToSecondSplashScreen() {
        this.nextCTA.click();
        browser.pause(2000);
        this.nextCTA.click();
        // expect(this.learnMoreCTA).toBeDisplayed;
        // this.learnMoreCTA.click();
    }

    closeSplashScreen() {
        this.closeButton.click();
    }

    goToForthSplashScreen() {
        this.nextCTA.click();
        browser.pause(2000);
        this.nextCTA.click();
        browser.pause(2000);
        this.nextCTA.click();
        browser.pause(2000);
    }

    goBackToFirstPage() {
        this.backCTA.click();
        browser.pause(2000);
        this.backCTA.click();
        browser.pause(2000);
        this.backCTA.click();
        browser.pause(2000);
    }

    goToLoginScreen(){
        this.loginAndRegistrationCTA.click();
    }
}

export default new SplashScreen();