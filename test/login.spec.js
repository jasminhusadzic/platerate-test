import LoginPage from '../page_objects/pages/LoginPage';
import HomePage from '../page_objects/pages/HomePage';
import LoginData from '../data/login.data';


describe('login suite', () => {
    
    beforeEach(()=>{
        HomePage.open();
        HomePage.prepareHome();
    });

    describe('login as user', ()=>{
        beforeEach(()=>{
            LoginPage.open();  
        });

        afterEach(()=>{
            browser.deleteAllCookies();
        })
  
        it('login with invalid credentials error message should appear', () => {   
            LoginPage.login('tom@test.com', 'supersifra');
            LoginPage.alertMessage.waitForDisplayed({
                timeout: 10000,
                timeoutMsg: "no invalid credentials error in 10 seconds"
            });
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

    describe('login as sale person', ()=>{
            beforeEach(()=>{
                LoginPage.open();  
            });
    
            afterEach(()=>{
                browser.deleteAllCookies();
            });

            it('check saleperson settings exist', ()=>{
                LoginPage.login(LoginData.salePerson, LoginData.passwordUniversal); 
                expect(HomePage.cart).toBeDisplayed;
                HomePage.menuComponent.openMenu();
                browser.pause(3000);
                expect(HomePage.menuComponent.menu.getText()).toContain('Salesperson Settings');
            })

            it("try to login with invalid credentials error should appear", ()=>{
                LoginPage.login(LoginData.salePerson, LoginData.invalidPassword);
                LoginPage.alertMessage.waitForDisplayed({
                timeout: 10000,
                timeoutMsg: "no invalid credentials error in 10 seconds"
                });
                expect(LoginPage.alertMessage.getText()).toContain('Oops! Wrong password.');
            })

    })

})
