import SearchResults from './components/SearchResults';
import ModalComponent from './components/ModalComponent';
import BasePage from './BasePage';
import MenuComponent from './components/MenuComponent';
import AlertComponent from './components/AlertComponent';
import LocalStorageWorker from './localStorage/LocalStorageWorker';
import OrderComponent from './components/OrderComponent';


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

    get alertComponent(){
        return AlertComponent;
    }

    get localStorageWorker(){
        return LocalStorageWorker;
    }

    get orderComponent(){
        return OrderComponent;
    }


   
}

export default CommonPage;