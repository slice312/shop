import {createReducer} from "@reduxjs/toolkit";
import {
    PRODUCTS_BESTSELLERS_RESET,
    PRODUCTS_BESTSELLERS_PUSHED,
    PRODUCTS_NOVELTIES_RESET,
    PRODUCTS_NOVELTIES_PUSHED
} from "src/shared/state/constants/actionTypes";


/**
 * @property {ProductCardInfo[]} bestsellers
 * @property {ProductCardInfo[]} novelties
 */
const initialState = {
    bestsellers: [],
    novelties: []
};

const productsBestsellersReset = (state, action) => ({
    ...state,
    bestsellers: [],
});

const productsBestsellersPushed = (state, action) => ({
    ...state,
    bestsellers: [...state.bestsellers, ...action.payload]
});

const productsNoveltiesReset = (state, action) => ({
    ...state,
    novelties: [],
});

const productsNoveltiesPushed = (state, action) => ({
    ...state,
    novelties: [...state.novelties, ...action.payload]
});


export const productsReducer = createReducer(initialState, builder => {
    return builder
        .addCase(PRODUCTS_BESTSELLERS_RESET, productsBestsellersReset)
        .addCase(PRODUCTS_BESTSELLERS_PUSHED, productsBestsellersPushed)
        .addCase(PRODUCTS_NOVELTIES_RESET, productsNoveltiesReset)
        .addCase(PRODUCTS_NOVELTIES_PUSHED, productsNoveltiesPushed)
        .addDefaultCase(state => state);
});