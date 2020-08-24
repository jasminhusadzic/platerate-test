import BasePage from "../BasePage";

class MenuComponent extends BasePage {
    get menuIcon(){return $("//header[@id='header']//i[contains(@class, 'sidenav-icon')]")};
    get menu(){return $("//div[contains(@class, 'sidenav-bg-main')]")};
    get accountHistory(){return $("#accountHistory")};
    get orderHistory(){return $("#headingOrdersHistory")};
    get ratingHistory(){return $("#headingPastRatings")};
    get findingFood(){return $("#findingFoods")};
    get photoGallery(){return $("#headingGallery")};
    get searchFriends(){return $("#headingFriendsReviews")};
    get personalInformation(){return $("#headingPersonalInfo")};
    get contactInfo(){return $("a=Contact Info")}
    get myRestaurants(){return $("#headingMyRestaurant")};
    get about(){return $("#headingNotif")};
    get aboutPlateRate(){return $("//a[contains(text(), 'About PlateRate')]")};


    openMenu(){
        this.waitElementForDisplayed(this.menuIcon);
        this.menuIcon.click();
    }

    openAccountHistory(){
        this.waitElementForDisplayed(this.accountHistory);
        this.accountHistory.click();
    }

    openOrderHistory(){
        this.waitElementForDisplayed(this.orderHistory);
        this.orderHistory.click();
    }
    
    openRatingHistory(){
        this.waitElementForDisplayed(this.ratingHistory);
        this.ratingHistory.click();
    }

    openFindingFood(){
        this.waitElementForDisplayed(this.findingFood);
        this.findingFood.click();
    }

    openPhotoGallery(){
        this.waitElementForDisplayed(this.photoGallery);
        this.photoGallery.click();
    }

    openSearchFriends(){
        this.waitElementForDisplayed(this.searchFriends);
        this.searchFriends.click();
    }

    openPersonalInformation(){
        this.waitElementForDisplayed(this.personalInformation);
        this.personalInformation.click();
    }

    openContactInfo(){
        this.waitElementForDisplayed(this.contactInfo);
        this.contactInfo.click();
    }

    openMyRestaurants(){
        this.waitElementForDisplayed(this.myRestaurants);
        browser.pause(1000);
        this.myRestaurants.click();
    }

    openAbout(){
        this.waitElementForDisplayed(this.about);
        browser.pause(1000);
        this.about.click();
    }

    openAboutPlateRate(){
        this.waitElementForDisplayed(this.aboutPlateRate);
        this.aboutPlateRate.click();
    }
 
}

export default new MenuComponent();