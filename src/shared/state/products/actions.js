import {
    PRODUCTS_RESET,
    PRODUCTS_SET,
    PRODUCTS_IS_FETCHING,
    PRODUCTS_ON_SERVER_QTY_SET,
    PRODUCTS_PUSHED,
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

const productsIsFetching = (isFetching) => ({type: PRODUCTS_IS_FETCHING, payload: isFetching});

const productsOnServerQtySet = (qty) => ({type: PRODUCTS_ON_SERVER_QTY_SET, payload: qty});

const productsPushed = (products) =>
    ({type: PRODUCTS_PUSHED, payload: products});

const bestsellersPushed = (products) =>
    ({type: PRODUCTS_BESTSELLERS_PUSHED, payload: products});

const noveltiesPushed = (products) =>
    ({type: PRODUCTS_NOVELTIES_PUSHED, payload: products});

const productFavoriteToggled = (productId) => ({type: PRODUCT_FAVORITE_TOGGLED, payload: productId});



/**
 * Загружает карточки товаров в категории "Хиты продаж" {@link Categories.Bestsellers}, добавляет к существующим.
 */
export const pushProductsBestsellers = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: PRODUCTS_BESTSELLERS_IS_FETCHING, payload: true}); // TODO: action creator private
            const state = getState();
            const loaded = Utils.Data.filterProductsByCategory(state.productsState.products, Categories.Bestsellers)
                .length;
            const response = await Api.getBestsellers(limit, loaded);
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
 * Загружает карточки товаров в категории "Новинки" {@link Categories.Novelties}, добавляет к существующим.
 */
export const pushProductNovelties = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: PRODUCTS_NOVELTIES_IS_FETCHING, payload: true});
            const state = getState();
            const loaded = Utils.Data.filterProductsByCategory(state.productsState.products, Categories.Novelties)
                .length;
            const response = await Api.getNovelties(limit, loaded);
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



/**
 * Загружает избранные товары, существующие удаляются.
 * @param {number} limit - Ограничение
 * @param {number?} offset - Смещение, по умолчанию 0
 * @param {function(AxiosResponse<ProductsResponse>)?} responseCallback
 */
export const setFavoriteProducts = (limit, offset = 0, responseCallback) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productsIsFetching(true));

            const response = await Api.getFavoriteProducts(limit, offset);
            if (response.status === 200) {
                dispatch(productsSet(response.data.products));
                dispatch(productsOnServerQtySet(response.data.totalQty))
                console.log("setFavoriteProducts success", response.data);
                responseCallback?.(response);
            } else
                console.log("setFavoriteProducts error", response.status);
        } catch (err) {
            console.error("setFavoriteProducts error", err);
        } finally {
            dispatch(productsIsFetching(false));
        }
    };
};

/**
 * Загружает избранные товары, добавляет к существующим.
 * @param {number} limit - Ограничение
 */
export const pushFavoriteProducts = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productsIsFetching(true));
            const state = getState();
            const loaded = state.productsState.products
                .filter(x => x.product.isFavorite)
                .length;
            const response = await Api.getFavoriteProducts(limit, loaded);
            if (response.status === 200) {
                console.log("pushFavoriteProducts success", response.data);
                dispatch(productsPushed(response.data.products));
            } else {
                console.error("pushFavoriteProducts error", response.status);
            }
        } catch (err) {
            console.error("pushFavoriteProducts error", err);
        } finally {
            dispatch(productsIsFetching(false));
        }
    };
};


/**
 * Добавляет или удаляет товар из избранного.
 * @param {string} productId - Id товара
 */
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


/**
 * Загружает указанное кол-во рандомных товаров, по 1 товару с коллекции.
 * @param {number} qty - Кол-во товаров
 */
export const setRandomProducts = (qty) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productsIsFetching(true));
            // TODO: исправить через запрос на пачку по массиву коллекций
            const response = await Api.getCollectionsNotEmpty(qty);
            const {collections} = response.data;

            const products = [];
            for (const coll of collections) {
                const {data: productsData} = await Api.getProductsByCollection(coll.id, 1);
                if (productsData.products.length)
                    products.push(productsData.products[0]);
            }

            dispatch(productsSet(products));
            console.log("setRandomProducts success", products);
        } catch (err) {
            console.error("setRandomProducts error", err);
        } finally {
            dispatch(productsIsFetching(false));
        }
    };
};