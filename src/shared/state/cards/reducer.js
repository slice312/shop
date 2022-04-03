import {createReducer} from "@reduxjs/toolkit";
import {
    CARDS_BESTSELLERS_RESET,
    CARDS_BESTSELLERS_PUSHED,
    CARDS_NOVELTIES_RESET,
    CARDS_NOVELTIES_PUSHED
} from "src/shared/state/constants/actionTypes";


/**
 * @property {ProductCardInfo[]} bestsellers
 * @property {ProductCardInfo[]} novelties
 */
const initialState = {
    bestsellers: [],
    novelties: []
};

const cardsBestsellersReset = (state, action) => ({
    ...state,
    bestsellers: [],
});

const cardsBestsellersPushed = (state, action) => ({
    ...state,
    bestsellers: [...state.bestsellers, ...action.payload]
});

const cardsNoveltiesReset = (state, action) => ({
    ...state,
    novelties: [],
});

const cardsNoveltiesPushed = (state, action) => ({
    ...state,
    novelties: [...state.novelties, ...action.payload]
});



export const cardsReducer = createReducer(initialState, builder => {
    return builder
        .addCase(CARDS_BESTSELLERS_RESET, cardsBestsellersReset)
        .addCase(CARDS_BESTSELLERS_PUSHED, cardsBestsellersPushed)
        .addCase(CARDS_NOVELTIES_RESET, cardsNoveltiesReset)
        .addCase(CARDS_NOVELTIES_PUSHED, cardsNoveltiesPushed)
        .addDefaultCase(state => state);
});