import lo from "lodash";
import {
    BASKET_RESET,
    BASKET_SET,
    BASKET_ITEM_SET,
    BASKET_ITEM_REMOVED
} from "src/shared/state/actionTypes";
import {productsSet} from "src/shared/state/products/actions";
import {Api} from "src/shared/utils/api";


export const basketReset = () => ({type: BASKET_RESET});

/**
 * @param {BasketItem[]} basketItems
 */
export const basketSet = (basketItems) => ({type: BASKET_SET, payload: basketItems});

/**
 * @param {BasketItem} item
 */
export const basketItemSet = (item) => ({type: BASKET_ITEM_SET, payload: item});

/**
 * @param {BasketItem} item
 */
export const basketItemRemoved = (item) => ({type: BASKET_ITEM_REMOVED, payload: item});


/**
 * Восстанавливает state корзины из {@link localStorage}.
 */
export const restoreBasket = () => {
    return (dispatch, getState) => {
        try {
            const basketItems = Object.keys(localStorage)
                .map(key => {
                    const [productId, color] = key.split("|");
                    return {
                        productId,
                        color,
                        qty: Number.parseInt(localStorage.getItem(key))
                    };
                });

            dispatch(basketSet(basketItems));
            console.log("restoreBasket success");

        } catch (err) {
            console.error("restoreBasket", err);
        }
    };
};


export const loadProductsFromBasket = () => {
    return async (dispatch, getState) => {
        try {
            const {basket} = getState();
            const productIds = lo.uniq(basket.items.map(x => x.productId));
            const response = await Api.getProductsByIds(productIds);
            if (response.status === 200) {
                dispatch(productsSet(response.data));
                console.log("loadProductsFromBasket success", response.data);
            } else
                console.error("loadProductFromBasket", response.status);
        } catch (err) {
            console.error("loadProductFromBasket", err);
        }
    };
};