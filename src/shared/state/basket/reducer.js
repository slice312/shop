import {createReducer} from "@reduxjs/toolkit";
import {
    BASKET_RESET,
    BASKET_SET,
    BASKET_ITEM_SET,
    BASKET_ITEM_REMOVED,
    BASKET_CALCULATED
} from "src/shared/state/actionTypes";




/**
 * @typedef BasketInfo
 * @property {number} productsModelQty - Кол-во линеек
 * @property {number} productsQty - Кол-во товаров
 * @property {number} amount - Общая сумма заказа
 * @property {number} discountAmount - Общая сумма скидки
 */

/**
 * @property {BasketItem[]} items
 * @property {BasketInfo} basketInfo
 */
const initialState = {
    items: [],
    basketInfo: {
        productsModelQty: 0,
        productsQty: 0,
        amount: 0,
        discountAmount: 0
    }
};


const caseBasketReset = (state, action) => ({
    ...state,
    items: [],
    basketInfo: {
        productsModelQty: 0,
        productsQty: 0,
        amount: 0,
        discountAmount: 0
    }
});

const caseBasketSet = (state, action) => ({
    ...state,
    items: action.payload
});


/**
 * При изменении существующего элемента, порядок сохраняется.
 */
const caseBasketItemSet = (state, action) => {
    const {productId, color} = action.payload;
    const existed = state.items
        .find(x => x.productId === productId && x.color === color);

    let items;
    if (existed) {
        items = state.items
            .map(x => (x.productId === existed.productId && x.color === color)
                ? action.payload
                : x
            );
    } else {
        items = [...state.items, action.payload];
    }
    return {
        ...state,
        items
    };
};


const caseBasketItemRemoved = (state, action) => {
    return {
        ...state,
        items: state.items
            .filter(x => x.productId !== action.payload.productId
                || x.color !== action.payload.color)
    };
};


const caseBasketCalculated = (state, action) => ({
    ...state,
    basketInfo: action.payload
});


export const basketReducer = createReducer(initialState, builder => {
    return builder
        .addCase(BASKET_RESET, caseBasketReset)
        .addCase(BASKET_SET, caseBasketSet)
        .addCase(BASKET_ITEM_SET, caseBasketItemSet)
        .addCase(BASKET_ITEM_REMOVED, caseBasketItemRemoved)
        .addCase(BASKET_CALCULATED, caseBasketCalculated)
        .addDefaultCase(state => state);
});