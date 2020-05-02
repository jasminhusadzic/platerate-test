import SearchResults from './components/SearchResults';
import ModalComponent from './components/ModalComponent';
import BasePage from './BasePage';


class CommonPage extends BasePage {


    get searchResults(){
        return SearchResults;
    }

    get modalComponent(){
        return ModalComponent;
    }

   
}

export default CommonPage;