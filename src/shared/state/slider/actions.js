import {SLIDER_IMAGES_RECEIVED} from "src/shared/state/constants/actionTypes";
import {Api} from "src/shared/utils/api";


/**
 * /TODO
 * @param {any[]} images
 * @return {{payload, type: string}}
 */
export const sliderImagesReceived = (images) =>
    ({type: SLIDER_IMAGES_RECEIVED, payload: images});


/**
 * ThunkCreator.
 * Загружает картинки для слайдера на главной странице.
 */
export const loadHomeSliderImages = () => {
    return async (dispatch, getState) => {
        try {
            const response = await Api.getHomeSliderImages();
            if (response.status === 200) {
                console.log("loadHomeSlideCards success", response.data);
                dispatch(sliderImagesReceived(response.data.images));
            } else {
                console.error("loadHomeSlideCards error", response.status);
            }
        } catch (err) {
            console.error("loadHomeSlideCards error", err);
        }
    };
};