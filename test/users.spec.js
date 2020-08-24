import HomePage from "../page_objects/pages/HomePage";
import LoginPage from "../page_objects/pages/LoginPage";
import WebMailPage from "../page_objects/pages/WebMailPage";
import LoginData from "../data/login.data";

describe('User Creation and login',()=>{
    beforeEach(()=>{
       LoginPage.open();
       HomePage.prepareHome();
    })

    afterEach(()=>{
        browser.deleteAllCookies();
        browser.clearSessionStorage();
    })

    fit('create and verify user', ()=>{
        LoginPage.createAccount(LoginPage.generateMoment(), 'user');
        WebMailPage.openWebMail();
        WebMailPage.login(LoginData.botEmail, LoginData.passwordUniversal);
        browser.pause(5000);
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