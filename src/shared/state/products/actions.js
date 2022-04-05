import {
    PRODUCTS_BESTSELLERS_RESET,
    PRODUCTS_BESTSELLERS_PUSHED,
    PRODUCTS_NOVELTIES_RESET,
    PRODUCTS_NOVELTIES_PUSHED
} from "src/shared/state/constants/actionTypes";
import {Api} from "src/shared/utils/api";


export const cardsBestSellersReset = () => ({type: PRODUCTS_BESTSELLERS_RESET});

export const cardsBestsellersPushed = (products) =>
    ({type: PRODUCTS_BESTSELLERS_PUSHED, payload: products});

export const cardsNoveltiesReset = () => ({type: PRODUCTS_NOVELTIES_RESET});

export const cardsNoveltiesPushed = (products) =>
    ({type: PRODUCTS_NOVELTIES_PUSHED, payload: products});


/**
 * ThunkCreator.
 * Загружает карточки товаров в категории "Хиты продаж".
 */
export const pushCardsBestsellers = (batchSize) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const loaded = state.products.bestsellers.length;
            const response = await Api.getBestsellers(batchSize, loaded);
            if (response.status === 200) {
                console.log("pushCardsBestsellers success", response.data);
                dispatch(cardsBestsellersPushed(response.data));
            } else {
                console.error("pushCardsBestsellers error", response.status);
            }
        } catch (err) {
            console.error("pushCardsBestsellers error", err);
        }
    };
};


/**
 * ThunkCreator.
 * Загружает карточки товаров в категории "Новинки".
 */
export const pushCardsNovelties = (batchSize) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const loaded = state.products.bestsellers.length;
            const response = await Api.getNovelties(batchSize, loaded);
            if (response.status === 200) {
                console.log("pushCardsNovelties success", response.data);
                dispatch(cardsNoveltiesPushed(response.data));
            } else {
                console.error("pushCardsNovelties error", response.status);
            }
        } catch (err) {
            console.error("pushCardsNovelties error", err);
        }
    };
};