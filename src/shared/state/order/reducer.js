import {createReducer} from "@reduxjs/toolkit";
import {
    ORDER_CALCULATE_RESET,
    ORDER_CALCULATE_SET
} from "src/shared/state/actionTypes";


/**
 * @typedef OrderInfo
 * @property {number} productsModelQty - Кол-во линеек
 * @property {number} productsQty - Кол-во товаров
 * @property {number} amount - Общая сумма заказа
 * @property {number} discountAmount - Общая сумма скидки
 */
/**
 * @type {OrderInfo}
 */
const initialState = {
    productsModelQty: 0,
    productsQty: 0,
    amount: 0,
    discountAmount: 0
};


const caseOrderCalculateReset = (state, action) => ({
    ...state,
    productsModelQty: 0,
    productsQty: 0,
    amount: 0,
    discountAmount: 0
});


const caseOrderCalculateSet = (state, action) => ({
    ...state,
    productsModelQty: action.payload.productsModelQty,
    productsQty: action.payload.productsQty,
    amount: action.payload.amount,
    discountAmount: action.payload.discountAmount
});


export const orderReducer = createReducer(initialState, builder => {
    return builder
        .addCase(ORDER_CALCULATE_RESET, caseOrderCalculateReset)
        .addCase(ORDER_CALCULATE_SET, caseOrderCalculateSet)
        .addDefaultCase(state => state);
});