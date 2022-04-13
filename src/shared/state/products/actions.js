import {
    PRODUCTS_RESET,
    PRODUCTS_SET,
    PRODUCTS_BESTSELLERS_IS_FETCHING,
    PRODUCTS_BESTSELLERS_PUSHED,
    PRODUCTS_NOVELTIES_IS_FETCHING,
    PRODUCTS_NOVELTIES_PUSHED,
    PRODUCT_FAVORITE_TOGGLED
} from "src/shared/state/actionTypes";
import {Api} from "src/shared/utils/api";
import {Utils} from "src/shared/utils";
import {Categories} from "src/shared/constants";


export const productsReset = () => ({type: PRODUCTS_RESET});

export const productsSet = (products) => ({type: PRODUCTS_SET, payload: products});



const bestsellersPushed = (products) =>
    ({type: PRODUCTS_BESTSELLERS_PUSHED, payload: products});

const noveltiesPushed = (products) =>
    ({type: PRODUCTS_NOVELTIES_PUSHED, payload: products});

const productFavoriteToggled = (productId) => ({type: PRODUCT_FAVORITE_TOGGLED, payload: productId});



/**
 * ThunkCreator.
 * Загружает карточки товаров в категории "Хиты продаж".
 */
export const pushProductsBestsellers = (batchSize) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: PRODUCTS_BESTSELLERS_IS_FETCHING, payload: true}); // TODO: action creator private
            const state = getState();
            const loaded = Utils.Data.filterProductsByCategory(state.productsState.products, Categories.Bestsellers)
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
        finally {
            dispatch({type: PRODUCTS_BESTSELLERS_IS_FETCHING, payload: false});
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
            dispatch({type: PRODUCTS_NOVELTIES_IS_FETCHING, payload: true});
            const state = getState();
            const loaded = Utils.Data.filterProductsByCategory(state.productsState.products, Categories.Novelties)
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
        finally {
            dispatch({type: PRODUCTS_NOVELTIES_IS_FETCHING, payload: false});
        }
    };
};


export const productFavoriteToggle = (productId) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const product = state.productsState.products.find(x => x.product.id === productId);
            if (product) {
                const response = await Api.product.setProductFavoriteFlag(productId, !product.product.isFavorite);
                if (response.status === 200) {
                    console.log("productFavoriteToggle success", response.data);
                    dispatch(productFavoriteToggled(productId));
                } else {
                    console.error("productFavoriteToggle error", response.status);
                }
            } else
                console.error("productFavoriteToggle", "productId not found in state");

        } catch (err) {
            console.error("productFavoriteToggle error", err);
        }
    };
};


/**
 *
 * @param {string} collectionId
 * @param {number} limit
 * @param {number} offset
 * @param {function(AxiosResponse<ProductsResponse>)?} responseCallback
 */
export const setProductsByCollection = (collectionId, limit, offset, responseCallback) => {
    return async (dispatch, getState) => {
        try {
            const response = await Api.getProductsByCollection(collectionId, limit, offset);
            if (response.status === 200) {
                console.log("setProductsByCollection success");
                dispatch(productsSet(response.data.products));
                responseCallback?.(response);
                // totalPageQty = response.data.totalQty; // TODO: всчего количество итемов, rename
            } else {
                console.error("setProductsByCollection error", response.status);
            }
        } catch (err) {
            console.error("setProductsByCollection error", err);
        }
    };
};