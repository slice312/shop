import {HOME_AD_SLIDE_IMAGES_RECEIVED} from "src/shared/state/actionTypes";
import {Api} from "src/shared/utils/api";


export const slideImagesReceived = (slides) => ({type: HOME_AD_SLIDE_IMAGES_RECEIVED, payload: slides});


/**
 * Загружает рекламные слайды для главной страницы.
 */
export const loadHomeAdSlideImages = () => {
    return async (dispatch, getState) => {
        try {
            const response = await Api.Common.getHomeAdSlideImages();
            if (response.status === 200) {
                console.log("loadHomeAdSlideImages success", response.data);
                dispatch(slideImagesReceived(response.data));
            } else {
                console.error("loadHomeAdSlideImages", response.status);
            }
        } catch (err) {
            console.error("loadHomeAdSlideImages", err);
        }
    };
};