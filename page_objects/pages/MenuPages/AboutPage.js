import CommonPage from '../../CommonPage';

class AboutPage extends CommonPage{

    get contentTitle(){return $("//header/h3")};

}

export default new AboutPage();