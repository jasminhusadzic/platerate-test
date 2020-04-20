import Page from '../Page'
import HomePage from './HomePage'


class ProfilePage extends Page {
    
    get menuIcon() { return $("span[onclick='openNav()']") }
    get logoutButton() {return $("//a[contains(text(), 'Logout')]")}
    
    logout(){
        browser.deleteCookie('session');
        browser.url('/');
        browser.waitUntil(
            ()=> HomePage.loginButton.isDisplayed(),
            {
                timeout: 20000,
                timeoutMsg: "Button is not displayed"
            }
        );
        // HomePage.loginButton.waitForDisplayed(
        //     {
        //         timeout: 20000,
        //         timeoutMsg: "Button is not displayed"
        //     }
        // )
    }
}
export default new ProfilePage();