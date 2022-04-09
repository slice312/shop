import {
    PRODUCTS_RESET,
    PRODUCTS_BESTSELLERS_PUSHED,
    PRODUCTS_NOVELTIES_PUSHED
} from "src/shared/state/actionTypes";
import {Api} from "src/shared/utils/api";
import {Utils} from "src/shared/utils";
import {Categories} from "src/shared/constants";


export const productsReset = () => ({type: PRODUCTS_RESET});


const bestsellersPushed = (products) =>
    ({type: PRODUCTS_BESTSELLERS_PUSHED, payload: products});

const noveltiesPushed = (products) =>
    ({type: PRODUCTS_NOVELTIES_PUSHED, payload: products});


/**
 * ThunkCreator.
 * Загружает карточки товаров в категории "Хиты продаж".
 */
export const pushProductsBestsellers = (batchSize) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const loaded = Utils.filterProductsByCategory(state.productsState.products, Categories.Bestsellers)
                .length;
            const response = await Api.getBestsellers(batchSize, loaded);
            if (response.status === 200) {
                console.log("pushProductsBestsellers success", response.data);
                dispatch(bestsellersPushed(response.data));
            } else {
                console.error("pushProductsBestsellers error", response.status);
            }
        } catch (err) {
            console.error("pushProductsBestsellers error", err);
        }
    };
};


/**
 * ThunkCreator.
 * Загружает карточки товаров в категории "Новинки".
 */
export const pushProductNovelties = (batchSize) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const loaded = Utils.filterProductsByCategory(state.productsState.products, Categories.Novelties)
                .length;
            const response = await Api.getNovelties(batchSize, loaded);
            if (response.status === 200) {
                console.log("pushProductNovelties success", response.data);
                dispatch(noveltiesPushed(response.data));
            } else {
                console.error("pushProductNovelties error", response.status);
            }
        } catch (err) {
            console.error("pushProductNovelties error", err);
        }
    };
};