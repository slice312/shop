import {
    BASKET_RESET,
    BASKET_SET,
    BASKET_ITEM_SET,
    BASKET_ITEM_REMOVED
} from "src/shared/state/actionTypes";
import {Utils} from "src/shared/utils";


const caseBasketReset = () => {
    localStorage.clear();

};

const caseBasketSet = (action) => {
    localStorage.clear();
    for (const item of action.payload) {
        const key = Utils.getBasketItemKey(item.productId, item.color);
        localStorage.setItem(key, item.qty);
    }
};

const caseBasketItemAdded = (action) => {
    const {productId, color, qty} = action.payload;
    const key = Utils.getBasketItemKey(productId, color);
    localStorage.setItem(key, qty);
    console.log(BASKET_ITEM_SET);
};

const caseBasketItemRemoved = (action) => {
    const {productId, color} = action.payload;
    const key = Utils.getBasketItemKey(productId, color);
    localStorage.removeItem(key);
};


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