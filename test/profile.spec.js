import HomePage from "../page_objects/pages/HomePage";
import LoginPage from "../page_objects/pages/LoginPage";
import ProfilePage from "../page_objects/pages/ProfilePage";
import SensoryExperience from "../page_objects/components/SensoryExperience";
import LoginData from '../data/login.data';
import ProfileData from '../data/profile.data';
import RestaurantPage from "../page_objects/pages/RestaurantPage";

function openTestRestaurant() {
    HomePage.open();
    HomePage.openTestRestaurant();
    RestaurantPage.collapseOrder();
}

describe("User profile test suite", ()=>{

    beforeAll(() => {
        HomePage.open();
        HomePage.prepareHome();
        LoginPage.open();
        LoginPage.login(LoginData.email, LoginData.password);
        expect(HomePage.cart).toBeDisplayed;
        
        
    });

    beforeEach(()=>{
        ProfilePage.open();
    })
    
    describe("Edit user profile data", ()=>{

        it("profile page should contain profile picture", ()=>{
            ProfilePage.waitforProfilePicture();
            expect(ProfilePage.profilePicture).toBeDisplayed;
        })
    
        it("profile page should contain user info", ()=>{
            ProfilePage.waitforUserName();
            expect(ProfilePage.userName).toBeDisplayed;
        })
    
        it("edit first and last name, should be changed on profile page", ()=>{
            ProfilePage.changeNames('Jasmin 2', 'Husadzic 2');
            ProfilePage.waitforUserName();
            expect(ProfilePage.userName.getText()).toContain('Jasmin 2');
    
        })
    
        it("add aditional email and save", ()=>{
            let currentEmails = ProfilePage.countEmails();
            ProfilePage.addAditionalEmail(LoginData.additionalEmail);
            expect(ProfilePage.countEmails()).toEqual(currentEmails + 1);
        })

        it("open contact info and edit home address then check is address changed", ()=>{
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
            ProfilePage.menuComponent.openPersonalInformation();
            ProfilePage.menuComponent.openContactInfo();
            expect(ProfilePage.getContactInfoHeading()).toContain("Home Address");
            expect(ProfilePage.getBySmsChecked()).toContain("true");

        })

        it("check contact preferences by email checked by default", ()=>{
            ProfilePage.menuComponent.openPersonalInformation();
            ProfilePage.menuComponent.openContactInfo();
            expect(ProfilePage.getContactInfoHeading()).toContain("Home Address");
            expect(ProfilePage.getByEmailChecked()).toContain("true");
        })

        it("check contact preferences dont contact me with marketing unchecked by default", ()=>{
            ProfilePage.menuComponent.openPersonalInformation();
            ProfilePage.menuComponent.openContactInfo();
            expect(ProfilePage.getContactInfoHeading()).toContain("Home Address");
            expect(ProfilePage.getneverContactChecked()).toContain("false");
        })

    })
    
    describe("Acount history tests", ()=>{

        it("navigate to order history url should be correct", ()=>{
            ProfilePage.menuComponent.openMenu();
            ProfilePage.menuComponent.openAccountHistory();
            ProfilePage.menuComponent.openOrderHistory();
            expect(ProfilePage.getCurrentUrl()).toContain("orderhistory");
        })

        it("history order type filters should be acivated", ()=>{
            ProfilePage.menuComponent.openMenu();
            ProfilePage.menuComponent.openAccountHistory();
            ProfilePage.menuComponent.openOrderHistory();
            ProfilePage.orderHistoryTypeButtons.forEach(element => {
                expect(element.getAttribute("class")).toContain("active");
            });
        })

        it("navigate to rating history url shoud be correct", ()=>{
            ProfilePage.menuComponent.openMenu();
            ProfilePage.menuComponent.openAccountHistory();
            ProfilePage.menuComponent.openRatingHistory();
            expect(ProfilePage.getCurrentUrl()).toContain("ratinghistory");
        })

    })

    describe("All preferences tests", () => {

        beforeEach(() => {
            ProfilePage.showAllPreferences();
        });

        it ("Allergies are hidden", () => {
            ProfilePage.waitForAllergiesHidden();
        });

    });

    describe("Dietary preferences tests", () => {
           
        beforeEach(() => {
            ProfilePage.showAllPreferences();
            ProfilePage.showDietaryPreferences();
        });
        
        // test on 
        // https://staging.platerate.guru/restaurant/marcello-s-ristorante-suffern-ny
        it("Allergy preferences should be set and displayed on restaurant menu", () => {
            ProfilePage.setDietaryPreferences();
            openTestRestaurant(); 
            RestaurantPage.checkMeetsPreferences();
        });

        it('Uncheck all dietary preferences', ()=>{
            ProfilePage.clearDietaryPreferences();
        });
    });
    
    describe("Sensory experience tests", () => {

        beforeEach(() => {
            ProfilePage.showAllPreferences();
            SensoryExperience.showSensoryExperience();
        })

        xit('set the preferences for each experience metric', () => {
            SensoryExperience.setSensoryExperience();
        });
    });

});