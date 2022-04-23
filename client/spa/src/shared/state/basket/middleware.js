import {
    BASKET_RESET,
    BASKET_SET,
    BASKET_ITEM_SET,
    BASKET_ITEM_REMOVED
} from "src/shared/state/actionTypes";
import {BASKET_ITEM_LOCAL_STORAGE_PREFIX} from "src/shared/constants";
import {Utils} from "src/shared/utils";


const caseBasketReset = () => {
    clearBasketItems();
};

const caseBasketSet = (action) => {
    clearBasketItems();
    for (const item of action.payload) {
        const key = Utils.getBasketItemKey(item.productId, item.color);
        localStorage.setItem(key, item.qty);
    }
};

const caseBasketItemAdded = (action) => {
    const {productId, color, qty} = action.payload;
    const key = Utils.getBasketItemKey(productId, color);
    localStorage.setItem(key, qty);
};

const caseBasketItemRemoved = (action) => {
    const {productId, color} = action.payload;
    const key = Utils.getBasketItemKey(productId, color);
    localStorage.removeItem(key);
};

const clearBasketItems = () => {
    Object.keys(localStorage)
        .forEach(key => {
            if (key.startsWith(BASKET_ITEM_LOCAL_STORAGE_PREFIX))
                localStorage.removeItem(key);
        });
};


/**
 * MiddleWare для синхронизации состояния корзины с {@link localStorage}.
 */
export const basketMiddleWare = store => next => action => {
    if (action.type === BASKET_RESET)
        caseBasketReset();
    else if (action.type === BASKET_SET)
        caseBasketSet(action);
    else if (action.type === BASKET_ITEM_SET)
        caseBasketItemAdded(action);
    else if (action.type === BASKET_ITEM_REMOVED)
        caseBasketItemRemoved(action);

    next(action);
};