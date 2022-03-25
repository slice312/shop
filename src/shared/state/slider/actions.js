import {SLIDER_CARDS_RECEIVED} from "src/shared/state/constants/actionTypes";
import {Api} from "src/shared/utils/api/api";

/**
 * @param {any[]} images
 * @return {{payload, type: string}}
 */
export const sliderCardsReceived = (images) =>
    ({type: SLIDER_CARDS_RECEIVED, payload: images});


/**
 * ThunkCreator.
 * Загружает картник для слайдера на главной странице.
 */
export const loadHomeSlideCards = () => {
    return async (dispatch, getState) => {
        try {
            const response = await Api.getHomeSliderImages();
            if (response.status === 200) {
                console.log("loadHomeSlideCards success", response.data);
                dispatch(sliderCardsReceived(response.data.images));
            } else {
                console.log("loadHomeSlideCards error", response.status);
            }
        } catch (err) {
            console.log("loadHomeSlideCards error", err);
        }
    };
};