const TimelineReporter = require('wdio-timeline-reporter');
import SignUpPage from '../page_objects/pages/SignUpPage';
import HomePage from '../Page_Objects/pages/HomePage';
import {validAccountSignUp,wrongData, facebookLogin} from '../data/credentials';
describe('Account Registration', () => {
  
  beforeEach(() => {
    browser.deleteAllCookies();
    SignUpPage.open();
    HomePage.prepareHome();

  })

  it('should Enter valid email to create a new Account ', () => {
    SignUpPage.submitValidCredentials(validAccountSignUp);
    expect(HomePage.restaurantTab).toBeDisplayed;
  });

  it('should Enter valid Phone number and create a new Account ', () => {
    SignUpPage.createAccountWithPhoneNumber(validAccountSignUp);
    expect(SignUpPage.sendCodeAgain).toBeDisplayed;
    expect(SignUpPage.confirmCode).toBeDisplayed;
  });

  it('Error Message should appears when user enter Wrong Phone Number', () => {
    SignUpPage.submitWrongCredentials(wrongData);
    expect(SignUpPage.phoneNumErrorMessage.getText()).toContain('Phone number not valid');   
  });

  it('should Sign in with Facebook Account', () => {
    SignUpPage.loginWithFacebook(facebookLogin);
    SignUpPage.continuewithFacebook();
    expect(SignUpPage.cart).toBeDisplayed;
  });

  it('should go to the Gmail screen', () => {
    SignUpPage.goTOGmail();
    expect(SignUpPage.gmailInputEmail).toBeDisplayed;
  });
  afterEach(()=>{
    browser.deleteAllCookies();
})
});