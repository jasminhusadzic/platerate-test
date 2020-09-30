const TimelineReporter = require('wdio-timeline-reporter').default;
let moment = require('moment');

class BasePage {

    static timeoutMsg(element, reverse = false) { 
        return (`
            ${element.getTagName()} 
            | ${element.getAttribute("class")}
            | ${element.getAttribute('id')} did ${reverse ? '' : 'not'} 
            appear before 15 seconds
        `);
    };

    open(path){
        browser.url(path);
        browser.maximizeWindow();
    } 

    reportDuration(duration){
        if(duration>=10 && duration <=60){
            TimelineReporter.addContext('WARNING');
        }
        TimelineReporter.addContext({
            title: 'Search duration is',
            value: duration.toString() + " seconds"
          });
    }

    waitElementForDisplayed(element){
        element.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: BasePage.timeoutMsg(element)
        });
    }

    waitForElementNotDisplayed(element){
        element.waitForDisplayed({
            timeout: 15000,
            reverse: true,
            timeoutMsg: BasePage.timeoutMsg(element, true)
        });
    }

    waitForElementClickable(element){
        element.waitForClickable({
            timeout: 20000,
            timeoutMsg: BasePage.timeoutMsg(element)
        })
    }
    

    waitForElementNotClickable(element){
        element.waitForClickable({
            timeout: 6000,
            reverse: true,
            timeoutMsg: BasePage.timeoutMsg(element, true)
        });
    }

    getPageTitle() {
        return browser.getTitle();
    }

    selectOption(selectElement, option) {
        this.waitElementForDisplayed(selectElement);
        selectElement.selectByAttribute('value', option);
    }

    clickElement(element, waitFor='displayed') {
        if (waitFor === 'clickable') {
            this.waitForElementClickable(element);
        }
        else {
            this.waitElementForDisplayed(element);
        }
        element.click();
    }

    generateMoment(){
        return moment().format('YYYYDDMMhhmm');
    }

    switchToBase(){
        browser.switchWindow(process.env.ENV+".platerate.guru/");
    }
}

export default BasePage;