import ForgotPassword from '../page_objects/pages/ForgotPasswordPage';
import { validAccountLogin, wrongData } from '../data/credentials';
import HomePage from '../page_objects/pages/HomePage';
import LoginPage from '../page_objects/pages/LoginPage';

describe('Forgot Password Testcases ', () => {

    beforeEach(() => {
        ForgotPassword.open();
        browser.deleteAllCookies();
        HomePage.prepareHome();
    })

    it('should submit worng format email', () => {
        expect(ForgotPassword.isOnPage());
        ForgotPassword.wrongFormatEmail(wrongData);
        expect(ForgotPassword.forgotPasswordErrorMessage.getText()).toContain('Email address '+String(wrongData.wrongEmail)+' is not found. Please check and try again.');
    })

    it('should throw error message if email is not registered ', () => {
        expect(ForgotPassword.isOnPage());
        ForgotPassword.notRegisteredEmail(wrongData);
        expect(ForgotPassword.forgotPasswordErrorMessage.getText()).toContain('Email address '+String(wrongData.notRegisteredEmail)+' is not found. Please check and try again.');
    })

    it('should take the user to the login back if click "Back to Log in" ', () => {
        expect(ForgotPassword.isOnPage());
        ForgotPassword.goBackToLoginPage();
        expect(LoginPage.email).toBeDisplayed;
    })

    it('should submit valid email', () => {
        expect(ForgotPassword.isOnPage());
        ForgotPassword.enterValidEmail(validAccountLogin);
        expect(ForgotPassword.resetPasswordLinkIsSent.getText()).toContain('Please check your email for a link to reset your password.');
    })

    afterEach(() => {
        browser.deleteAllCookies();
    })
});