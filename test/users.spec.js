import HomePage from "../page_objects/pages/HomePage";
import LoginPage from "../page_objects/pages/LoginPage";

describe('User Creation and login',()=>{
    beforeEach(()=>{
       LoginPage.open();
    })

    afterEach(()=>{
        browser.deleteAllCookies();
        browser.clearSessionStorage();
    })

    it('create and verify user', ()=>{
        LoginPage.createAccount(LoginPage.generateMoment(), 'user');
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