import SearchResults from './components/SearchResults';

const TimelineReporter = require('wdio-timeline-reporter').default;
class Page {

    open(path){
        browser.url(path);
        browser.maximizeWindow();
    }

    get searchResults(){
        return SearchResults;
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
}

export default Page;