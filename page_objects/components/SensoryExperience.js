import BasePage from "../BasePage";
import ProfileData from '../../data/profile.data';

class SensoryExperience extends BasePage {

    get forSweetMin() {return $('#forSweet .min-slider-handle')};
    get forSweetSlider() {return $('#forSweet .slider-track')};
    get forSaltySlider() {return $('#forSalty .slider-track')};
    get forSpicySlider() {return $('#forSpicy .slider-track')};
    get saveProfile() {return $('#save_tasterProfile')};
    get collapseSensoryExperience() {return $("a[href='#collapseTa']")};

    moveSlider(element, xOffset, yOffset=undefined){
        this.waitForElementClickable(element);
        element.moveTo(xOffset, yOffset);
        browser.positionClick();
    }
    
    setRange(elem, min, max) {

        this.moveSlider(elem, min);
        this.moveSlider(elem, max);
    }
    
    resetRange(elem) {
        const { minDefaultSE, maxDefaultSE } = ProfileData;
        
        this.setRange(elem, minDefaultSE, maxDefaultSE);
    }
    
    showSensoryExperience() {
        this.clickElement(this.collapseSensoryExperience);
    }

    saveTasterProfile() {
        this.clickElement(this.saveProfile);
    }

    setSensoryExperience() {
        const { minDefaultSE, maxDefaultSE} = ProfileData;
        this.setRange(this.forSweetSlider, 20, maxDefaultSE);
        this.setRange(this.forSaltySlider, 20, 50);
        this.setRange(this.forSpicySlider, 0, minDefaultSE);
        this.saveTasterProfile();
    }
    
    resetSensoryExperience() {
        this.resetRange(this.forSweetSlider);
        this.resetRange(this.forSaltySlider);
        this.resetRange(this.forSpicySlider);
        this.saveTasterProfile();
    }
}

export default new SensoryExperience();