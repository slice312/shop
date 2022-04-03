import {
    CARDS_BESTSELLERS_RESET,
    CARDS_BESTSELLERS_PUSHED,
    CARDS_NOVELTIES_RESET,
    CARDS_NOVELTIES_PUSHED
} from "src/shared/state/constants/actionTypes";
import {Api} from "src/shared/utils/api";


export const cardsBestSellersReset = () => ({type: CARDS_BESTSELLERS_RESET});

export const cardsBestsellersPushed = (cards) =>
    ({type: CARDS_BESTSELLERS_PUSHED, payload: cards});

export const cardsNoveltiesReset = () => ({type: CARDS_NOVELTIES_RESET});

export const cardsNoveltiesPushed = (cards) =>
    ({type: CARDS_NOVELTIES_PUSHED, payload: cards});


/**
 * ThunkCreator.
 * Загружает карточки товаров в категории "Хиты продаж".
 */
export const pushCardsBestsellers = (batchSize) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const loaded = state.cards.bestsellers.length;
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
            const loaded = state.cards.bestsellers.length;
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