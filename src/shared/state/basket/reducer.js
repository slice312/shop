import {createReducer} from "@reduxjs/toolkit";
import {
    BASKET_RESET,
    BASKET_SET,
    BASKET_ITEM_SET,
    BASKET_ITEM_REMOVED
} from "src/shared/state/actionTypes";


/**
 * @typedef BasketItem
 * @property {string} productId - Id товара
 * @property {string} color - Цвет товара
 * @property {number} qty - Кол-во
 */
/**
 * @property {BasketItem[]} items
 */
const initialState = {
    items: []
};


const caseBasketReset = (state, action) => ({
    ...state,
    items: []
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


export const basketReducer = createReducer(initialState, builder => {
    return builder
        .addCase(BASKET_RESET, caseBasketReset)
        .addCase(BASKET_SET, caseBasketSet)
        .addCase(BASKET_ITEM_SET, caseBasketItemSet)
        .addCase(BASKET_ITEM_REMOVED, caseBasketItemRemoved)
        .addDefaultCase(state => state);
});