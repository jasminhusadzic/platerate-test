import HomePage from "../page_objects/pages/HomePage";
import LoginPage from "../page_objects/pages/LoginPage";
import ProfilePage from "../page_objects/pages/ProfilePage";
import LoginData from '../data/login.data';
import ProfileData from '../data/profile.data';

describe("User profile test suite", ()=>{

    beforeEach(()=>{
        LoginPage.open();
        HomePage.prepareHome();
        LoginPage.login('jasmin.husadzic@gmail.com', 'test123');
        expect(HomePage.cart).toBeDisplayed;
        ProfilePage.open();
    });

    afterEach(()=>{
        if(HomePage.cart.isDisplayed()){
            ProfilePage.logout();
        } 
    });
    
    describe("Edit user profile data", ()=>{

        it("profile page should contain profile picture", ()=>{
            ProfilePage.open();
            ProfilePage.waitforProfilePicture();
            expect(ProfilePage.profilePicture).toBeDisplayed;
        })
    
        it("profile page should contain user info", ()=>{
            ProfilePage.open();
            ProfilePage.waitforUserName();
            expect(ProfilePage.userName).toBeDisplayed;
        })
    
        it("edit first and last name, should be changed on profile page", ()=>{
            ProfilePage.open();
            ProfilePage.changeNames('Jasmin 2', 'Husadzic 2');
            ProfilePage.waitforUserName();
            expect(ProfilePage.userName.getText()).toContain('Jasmin 2');
    
        })
    
        it("add aditional email and save", ()=>{
            ProfilePage.open();
            let currentEmails = ProfilePage.countEmails();
            ProfilePage.addAditionalEmail(LoginData.additionalEmail);
            expect(ProfilePage.countEmails()).toEqual(currentEmails + 1);
        })

        it("open contact info and edit home address then check is address changed", ()=>{
            ProfilePage.open();
            ProfilePage.menuComponent.openPersonalInformation();
            ProfilePage.menuComponent.openContactInfo();
            expect(ProfilePage.getContactInfoHeading()).toContain("Home Address");
            let address = ProfileData.homeAddress + ProfilePage.generateMoment();
            ProfilePage.insertStreetAddress(address);
            ProfilePage.saveHomeAddress();
            ProfilePage.waitForProfileSavedMessage();
            expect(ProfilePage.getHomeAddressLabel()).toContain(address);
        })

        it("check contact preferences by text message checked by default", ()=>{
            ProfilePage.open();
            ProfilePage.menuComponent.openPersonalInformation();
            ProfilePage.menuComponent.openContactInfo();
            expect(ProfilePage.getContactInfoHeading()).toContain("Home Address");
            expect(ProfilePage.getBySmsChecked()).toContain("true");

        })

        it("check contact preferences by email checked by default", ()=>{
            ProfilePage.open();
            ProfilePage.menuComponent.openPersonalInformation();
            ProfilePage.menuComponent.openContactInfo();
            expect(ProfilePage.getContactInfoHeading()).toContain("Home Address");
            expect(ProfilePage.getByEmailChecked()).toContain("true");
        })

        it("check contact preferences dont contact me with marketing unchecked by default", ()=>{
            ProfilePage.open();
            ProfilePage.menuComponent.openPersonalInformation();
            ProfilePage.menuComponent.openContactInfo();
            expect(ProfilePage.getContactInfoHeading()).toContain("Home Address");
            expect(ProfilePage.getneverContactChecked()).toContain("false");
        })

    })
    
    describe("Acount history tests", ()=>{

        it("navigate to order history url should be correct", ()=>{
            ProfilePage.open();
            ProfilePage.menuComponent.openMenu();
            ProfilePage.menuComponent.openAccountHistory();
            ProfilePage.menuComponent.openOrderHistory();
            expect(ProfilePage.getCurrentUrl()).toContain("orderhistory");
        })

        it("history order type filters should be acivated", ()=>{
            ProfilePage.open();
            ProfilePage.menuComponent.openMenu();
            ProfilePage.menuComponent.openAccountHistory();
            ProfilePage.menuComponent.openOrderHistory();
            ProfilePage.orderHistoryTypeButtons.forEach(element => {
                expect(element.getAttribute("class")).toContain("active");
            });
        })

        it("navigate to rating history url shoud be correct", ()=>{
            ProfilePage.open();
            ProfilePage.menuComponent.openMenu();
            ProfilePage.menuComponent.openAccountHistory();
            ProfilePage.menuComponent.openRatingHistory();
            expect(ProfilePage.getCurrentUrl()).toContain("ratinghistory");
        })

    })


    describe("Dietary preferences tests", ()=>{

        beforeEach(() => {
            ProfilePage.preparePreferences();
        })

        afterEach(() => {
            ProfilePage.clearDietaryPreferences();
        })
        
        it("Allergy preferences should be set", () => {
            ProfilePage.waitForAllergiesHidden();
            ProfilePage.setDietaryPreferences();
            expect(ProfilePage.getMSGPreferenceValue()).toBe('Mostly');
            expect(ProfilePage.getCrueltyPreferenceValue()).toBe('Mostly');
            expect(ProfilePage.getFatPreferenceValue()).toBe('Mostly');
        });
    });
});