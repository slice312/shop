import {
    PRODUCTS_RESET,
    PRODUCTS_SET,
    PRODUCTS_IS_FETCHING,
    PRODUCTS_ON_SERVER_QTY_SET,
    PRODUCTS_PUSHED,
    PRODUCTS_BESTSELLERS_PUSHED,
    PRODUCTS_NOVELTIES_PUSHED,
    PRODUCT_FAVORITE_TOGGLED
} from "src/shared/state/actionTypes";
import {Api} from "src/shared/utils/api";
import {Utils} from "src/shared/utils";
import {Categories} from "src/shared/constants";


export const productsReset = () => ({type: PRODUCTS_RESET});

/**
 * @param {ProductInfo[]} products
 */
export const productsSet = (products) => ({type: PRODUCTS_SET, payload: products});

/**
 * @param {bool} isFetching
 */
const productsIsFetching = (isFetching) => ({type: PRODUCTS_IS_FETCHING, payload: isFetching});

/**
 * @param {number} qty
 */
const productsOnServerQtySet = (qty) => ({type: PRODUCTS_ON_SERVER_QTY_SET, payload: qty});

/**
 * @param {ProductInfo[]} products
 */
const productsPushed = (products) =>
    ({type: PRODUCTS_PUSHED, payload: products});

/**
 * @param {ProductInfo[]} products
 */
const bestsellersPushed = (products) =>
    ({type: PRODUCTS_BESTSELLERS_PUSHED, payload: products});

/**
 * @param {ProductInfo[]} products
 */
const noveltiesPushed = (products) =>
    ({type: PRODUCTS_NOVELTIES_PUSHED, payload: products});

/**
 * @param {string} productId
 */
const productFavoriteToggled = (productId) => ({type: PRODUCT_FAVORITE_TOGGLED, payload: productId});



/**
 * Загружает карточки товаров в категории "Хиты продаж" {@link Categories.Bestsellers}, добавляет к существующим.
 */
export const pushProductsBestsellers = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productsIsFetching(true));

            const state = getState();
            const loaded = Utils.Data.filterProductsByCategory(state.productsState.products, Categories.Bestsellers)
                .length;

            const response = await Api.Products.getBestsellers(limit, loaded);
            if (response.status === 200) {
                console.log("pushProductsBestsellers success", response.data);
                dispatch(bestsellersPushed(response.data));
            } else {
                console.error("pushProductsBestsellers", response.status);
            }
        } catch (err) {
            console.error("pushProductsBestsellers", err);
        }
        finally {
            dispatch(productsIsFetching(false));
        }
    };
};


/**
 * Загружает карточки товаров в категории "Новинки" {@link Categories.Novelties}, добавляет к существующим.
 */
export const pushProductNovelties = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productsIsFetching(true));

            const state = getState();
            const loaded = Utils.Data.filterProductsByCategory(state.productsState.products, Categories.Novelties)
                .length;

            const response = await Api.Products.getNovelties(limit, loaded);
            if (response.status === 200) {
                dispatch(noveltiesPushed(response.data));
                console.log("pushProductNovelties success", response.data);
            } else {
                console.error("pushProductNovelties", response.status);
            }
        } catch (err) {
            console.error("pushProductNovelties", err);
        }
        finally {
            dispatch(productsIsFetching(false));
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

            const response = await Api.Products.getFavoriteProducts(limit, offset);
            if (response.status === 200) {
                dispatch(productsSet(response.data.products));
                dispatch(productsOnServerQtySet(response.data.totalQty))
                console.log("setFavoriteProducts success", response.data);
                responseCallback?.(response);
            } else
                console.error("setFavoriteProducts", response.status);
        } catch (err) {
            console.error("setFavoriteProducts", err);
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

            const response = await Api.Products.getFavoriteProducts(limit, loaded);
            if (response.status === 200) {
                console.log("pushFavoriteProducts success", response.data);
                dispatch(productsPushed(response.data.products));
            } else {
                console.error("pushFavoriteProducts", response.status);
            }
        } catch (err) {
            console.error("pushFavoriteProducts", err);
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
                const response = await Api.Products.setProductFavoriteFlag(productId, !product.product.isFavorite);
                if (response.status === 200) {
                    dispatch(productFavoriteToggled(productId));
                    console.log("productFavoriteToggle success", response.data);
                } else {
                    console.error("productFavoriteToggle", response.status);
                }
            } else
                console.error("productFavoriteToggle", "productId not found in state");

        } catch (err) {
            console.error("productFavoriteToggle", err);
        }
    };
};


/**
 * Загружает товары для коллекции, перезаписывая старый state.
 * @param {string} collectionId - Id коллекции
 * @param {number} limit - Ограничение на кол-во в ответе
 * @param {number?} offset - Смещение, по умолчанию 0
 */
export const loadProductsByCollection = (collectionId, limit, offset= 0) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productsIsFetching(true));

            const response = await Api.Products.getProductsByCollection(collectionId, limit, offset);

            if (response.status === 200) {
                dispatch(productsSet(response.data.products));
                dispatch(productsOnServerQtySet(response.data.totalQty))
                console.log("loadProductsByCollection success");
            } else {
                console.error("loadProductsByCollection", response.status);
            }
        } catch (err) {
            console.error("loadProductsByCollection", err);
        } finally {
            dispatch(productsIsFetching(false));
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
            const response = await Api.Collections.getCollectionsNotEmpty(qty);
            const {collections} = response.data;

            const products = [];
            for (const coll of collections) {
                const {data: productsData} = await Api.Products.getProductsByCollection(coll.id, 1);
                if (productsData.products.length)
                    products.push(productsData.products[0]);
            }

            dispatch(productsSet(products));
            console.log("setRandomProducts success", products);
        } catch (err) {
            console.error("setRandomProducts", err);
        } finally {
            dispatch(productsIsFetching(false));
        }
    };
};