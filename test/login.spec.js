import LoginPage from '../page_objects/pages/LoginPage';
import HomePage from '../page_objects/pages/HomePage';


describe('login suite', () => {

    beforeEach(()=>{
          LoginPage.open();  
    });

    it('login with invalid credentials error message should appear', () => {   
        LoginPage.login('tom@test.com', 'supersifra');
        expect(LoginPage.alertMessage.getText()).toContain('This email is not registered');
    })

    it("login with valid credentials home page should appear with shopping cart in top right corner", () => {
        LoginPage.login('jasmin.husadzic@gmail.com', 'test123'); 
        expect(HomePage.cart).toBeDisplayed;
    })

    // it ("login with facebook account, home page should appear with shopping cart in top right conrner", ()=>{
    //     LoginPage.loginWithFacebook('platerateit@gmail.com', 'Thegurus');  
    //     expect(HomePage.cart).toBeDisplayed;
    // })

    afterEach(()=>{
        browser.deleteAllCookies();
    })
    
})
