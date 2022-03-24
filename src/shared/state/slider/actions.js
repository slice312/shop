import {SLIDER_CARDS_RECEIVED} from "src/shared/state/constants/actionTypes"


/**
 * @param {any[]} images
 * @return {{payload, type: string}}
 */
export const sliderCardsReceived = (images) =>
    ({type: SLIDER_CARDS_RECEIVED, payload: images});


/**
 * ThunkCreator.
 * @return {(function(dispatch, getState): void)} - Загружает картник для свайпера на главной странице
 */
export const loadHomeSlideCards = () => {
    return async (dispatch, getState) => {
        try {
            // TODO: query to API
            // Пока загрузил картинки сюда https://trio-lyro.imgbb.com
            // вход через trio.bone@gmail.com

            const images = [
                {url: `https://i.ibb.co/zNSmhCT/slice-Image.png`, link: ``},
                {url: `https://i.ibb.co/zNSmhCT/slice-Image.png`, link: `https://trio-lyro.imgbb.com`},
                {url: `https://i.ibb.co/zNSmhCT/slice-Image.png`, link: `https://trio-lyro.imgbb.com`},
                {url: `https://i.ibb.co/zNSmhCT/slice-Image.png`, link: `https://trio-lyro.imgbb.com`}
            ]
            dispatch(sliderCardsReceived(images));

        } catch (err) {
            console.log("loadHomeSlideCards error", err);
        }
    };
};