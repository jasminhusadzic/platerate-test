import HomePage from "../page_objects/pages/HomePage";
import LoginPage from "../page_objects/pages/LoginPage";
import ProfilePage from "../page_objects/pages/ProfilePage";
import LoginData from '../data/login.data';

describe("User profile test suite", ()=>{
    
    beforeEach(()=>{
        LoginPage.open();
        HomePage.prepareHome();
        LoginPage.login('jasmin.husadzic@gmail.com', 'test123');
        expect(HomePage.cart).toBeDisplayed;
    });

    afterEach(()=>{
        if(HomePage.cart.isDisplayed()){
            ProfilePage.logout();
        } 
    });

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

    fit("add aditional email and save", ()=>{
        ProfilePage.open();
        let currentEmails = ProfilePage.countEmails();
        ProfilePage.addAditionalEmail(LoginData.additionalEmail);
        expect(ProfilePage.countEmails()).toEqual(currentEmails + 1);
    })
});