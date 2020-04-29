import HomePage from "../page_objects/pages/HomePage";
import LoginPage from "../page_objects/pages/LoginPage";
import ProfilePage from "../page_objects/pages/ProfilePage";

describe("User profile test suite", ()=>{
    
    beforeEach(()=>{
        LoginPage.open();
        HomePage.acceptCoockiesButton.isDisplayed() ? HomePage.acceptCoockies() : console.log('nema kukija');  
        LoginPage.login('jasmin.husadzic@gmail.com', 'test123');
        expect(HomePage.cart).toBeDisplayed;
    });

    afterEach(()=>{
        if(HomePage.cart.isDisplayed()){
            ProfilePage.logout();
        } 
    });

    xit("profile page should contain profile picture", ()=>{
        ProfilePage.open();
        ProfilePage.waitforProfilePicture();
        expect(ProfilePage.profilePicture).toBeDisplayed;
    })

    xit("profile page should contain user info", ()=>{
        ProfilePage.open();
        ProfilePage.waitforUserName();
        expect(ProfilePage.userName).toBeDisplayed;
    })

    xit("edit first and last name, should be changed on profile page", ()=>{
        ProfilePage.open();
        ProfilePage.changeNames('Jasmin 2', 'Husadzic 2');
        ProfilePage.waitforUserName();
        expect(ProfilePage.userName.getText()).toContain('Jasmin 2');

    })

    it("add aditional email and save", ()=>{
        ProfilePage.open();
        ProfilePage.addAditionalEmail('dodatn22i@email.com');
        expect($('#secondaryemail').getAttribute('value')).toContain('nesto');
    })


});