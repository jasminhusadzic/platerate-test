import Page from '../Page'
import { start } from 'chromedriver';
 
class HomePage extends Page {

    open(){
        super.open('/');
    }

    get filterIcon(){return $("//a[@href='#filter-form']/i")}
    get cart(){return $("//i[@class='fa fa-shopping-cart shopping_card']")};
    get filterHeading(){return $("h4=Filter")};
    get acceptCoockiesButton(){return $("#acceptCookies")};
    get neverPlay(){return $('strong*=play again')};
    get searchInput(){return $('#search')};
    get resultInfoHeader(){return $('#venucountDiv')};
    get searchButton(){return $('#searchbutton')};
    get loginButton(){return $('button*=Login/Register')};

    clickOnSlider(){
        this.filterIcon.click();
    }

    acceptCoockies(){
        this.acceptCoockiesButton.click();
    }

    clickNeverPlay(){
        this.neverPlay.click();
    }

    search(searchTerm){
        this.searchInput.setValue(searchTerm);
        this.searchButton.click();
        browser.waitUntil(
            ()=> this.resultInfoHeader.getText().includes(searchTerm),
            {
                timeout: 120000,
                timeoutMsg: searchTerm + ' did not appear before 2 minutes'
            }
        );
    }


    getSearchDuration(searchTerm){
        let startTime = new Date();
        startTime.getTime();
        if(searchTerm != null){
            this.search(searchTerm);
        }
        let endTime = new Date;
        endTime.getTime();
        return ((endTime - startTime)/1000);
    }
}


export default new HomePage();