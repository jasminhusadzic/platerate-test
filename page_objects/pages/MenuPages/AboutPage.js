import CommonPage from '../../CommonPage';

class AboutPage extends CommonPage{

    get contentTitle(){return $("//header/h1")};

}

export default new AboutPage();