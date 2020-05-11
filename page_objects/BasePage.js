const TimelineReporter = require('wdio-timeline-reporter').default;
let moment = require('moment');

class BasePage {

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
            timeout: 20000,
            timeoutMsg: element.getTagName() +" | "+ element.getAttribute("class") + " did not appear"
        })
    }

    generateMoment(){
        return moment().format('YYYYDDMM');
    }
}

export default BasePage;