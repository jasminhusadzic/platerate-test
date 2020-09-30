import HomePage from "../page_objects/pages/HomePage";
import LoginPage from "../page_objects/pages/LoginPage";
import WebMailPage from "../page_objects/pages/WebMailPage";
import LoginData, { email } from "../data/login.data";
import SignUpPage from "../page_objects/pages/SignUpPage";
import ProfilePage from "../page_objects/pages/ProfilePage";

describe('User Creation and login',()=>{
    beforeAll(()=>{
       HomePage.open();
       HomePage.prepareHome();
    })

    beforeEach(()=>{
        LoginPage.open();
    })

    afterEach(()=>{
        if(HomePage.cart.isDisplayed()){
            ProfilePage.logout();
        }
    })

    it('create and verify user', ()=>{
        WebMailPage.openTempWebmail();
        let webMailUrl = WebMailPage.getCurrentUrl();
        let email = WebMailPage.getGeneratedEmail();
        WebMailPage.switchToBase();
        LoginPage.createAccountWithGeneretedEmail(email);
        browser.switchWindow(webMailUrl);
        WebMailPage.confirmWebMailRegistration();
        SignUpPage.setPassword(LoginData.password, LoginData.password);
        expect(ProfilePage.getNewUserAlertText()).toContain('Please add a first name and last name to your profile');
    });

    it('create and verify sales', ()=>{
        LoginPage.createAccount(LoginPage.generateMoment(), 'sales');
    });

    it('create and verify restaurantadmin', ()=>{
        LoginPage.createAccount(LoginPage.generateMoment(), 'restaurantadmin');
    });

    it('create and verify affiliate', ()=>{
        LoginPage.createAccount(LoginPage.generateMoment(), 'affiliate');
    });

    it('create and verify sales-recruit', ()=>{
        LoginPage.createAccount(LoginPage.generateMoment(), 'sales-recruit');
    });

    it('create and verify affiliate-recruit', ()=>{
        LoginPage.createAccount(LoginPage.generateMoment(), 'affiliate-recruit');
    });

    it('create and verify affiliate-recruit-recruit', ()=>{
        LoginPage.createAccount(LoginPage.generateMoment(), 'affiliate-recruit-recruit');
    });

});