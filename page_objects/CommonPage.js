import SearchResults from './components/SearchResults';
import ModalComponent from './components/ModalComponent';
import BasePage from './BasePage';
import MenuComponent from './components/MenuComponent';


class CommonPage extends BasePage {


    get searchResults(){
        return SearchResults;
    }

    get modalComponent(){
        return ModalComponent;
    }

    get menuComponent(){
        return MenuComponent;
    }

   
}

export default CommonPage;