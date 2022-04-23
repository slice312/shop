import lo from "lodash";
import {
    BASKET_RESET,
    BASKET_SET,
    BASKET_ITEM_SET,
    BASKET_ITEM_REMOVED,
    BASKET_CALCULATED
} from "src/shared/state/actionTypes";
import {productsSet} from "src/shared/state/products/actions";
import {BASKET_ITEM_LOCAL_STORAGE_PREFIX} from "src/shared/constants";
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
 * @param {BasketInfo} basketInfo
 */
export const basketCalculated = (basketInfo) => ({type: BASKET_CALCULATED, payload: basketInfo});


/**
 * Восстанавливает state корзины из {@link localStorage}.
 */
export const restoreBasket = () => {
    return (dispatch, getState) => {
        try {
            const basketItems = Object.keys(localStorage)
                .filter(key => key.startsWith(BASKET_ITEM_LOCAL_STORAGE_PREFIX))
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


/**
 * Загрузить товары с полным их описанием, по тем что лежат в корзине.
 * В корзине лежат только id и color, без описания.
 */
export const loadProductsFromBasket = () => {
    return async (dispatch, getState) => {
        try {
            const {basket} = getState();
            const productIds = lo.uniq(basket.items.map(x => x.productId));
            const response = await Api.Products.getProductsByIds(productIds);
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


/**
 * Подсчитать стоимость корзины.
 * Поле {@link BasketInfo} basketInfo.
 */
export const calculateBasket = () => {
    return (dispatch, getState) => {

        const state = getState();
        const basketItems =  state.basket.items;
        const productsInfo = state.productsState.products;

        const productsModelQty = productsInfo.length;
        let productsQty = 0;
        let amount = 0;
        let discountAmount = 0

        for (const item of basketItems) {
            productsQty += item.qty;
            const info = productsInfo.find(x => x.product.id === item.productId);
            if (info) {
                amount += info.product.price * item.qty;
                discountAmount += info.product.price * info.product.discount / 100 * item.qty;
            }
        }

        dispatch(basketCalculated({
            productsModelQty,
            productsQty,
            amount,
            discountAmount
        }));
    };
};