import upperRightCorner from './upperRightCorner.gif';
import upperLeftCorner from './upperLeftCorner.gif';
import transparentTerminator from './transparentTerminator.gif';
import search_small from './search_small.gif';
import dropdown_button_small from './dropdown_button_small.gif';
import departures from './departures.gif';
import bottomRightCorner from './bottomRightCorner.gif';
import bottomLeftCorner from './bottomLeftCorner.gif';
import arrivings from './arrivings.gif';
import loginPageTakeOff from './take-off-1.jpg';
import planeBanner from './plane_banner.gif';
import loginIcon from'./Login.png';
import customersIcon from './customers.png';
import airlineIcon from'./airlineIcon.png';
import flightsmamagementSystemDefaultIcon from './flightsManagementSystemDefault.png';




const imagesMap = () => {

    let mapOfImages = new Map();
    mapOfImages.set('upperRightCorner', upperRightCorner);
    mapOfImages.set('upperLeftCorner', upperLeftCorner);
    mapOfImages.set('transparentTerminator', transparentTerminator);
    mapOfImages.set('search_small', search_small);
    mapOfImages.set('dropdown_button_small', dropdown_button_small);
    mapOfImages.set('departures', departures);
    mapOfImages.set('bottomRightCorner', bottomRightCorner);
    mapOfImages.set('bottomLeftCorner', bottomLeftCorner);
    mapOfImages.set('arrivings', arrivings);
    mapOfImages.set('loginPageTakeOff', loginPageTakeOff);
    mapOfImages.set('planeBanner', planeBanner);
    mapOfImages.set('Login', loginIcon);
    mapOfImages.set('customersIcon', customersIcon);
    mapOfImages.set('airlineIcon', airlineIcon);

    //default icon
    mapOfImages.set('flightsmamagementSystemDefaultIcon', flightsmamagementSystemDefaultIcon);

    return mapOfImages;
}

export default imagesMap;
