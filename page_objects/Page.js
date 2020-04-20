class Page {
 
    open(path){
        browser.url(path);
        browser.maximizeWindow();
    }
}

export default Page;