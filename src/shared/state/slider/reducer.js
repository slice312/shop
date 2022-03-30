import {createReducer} from "@reduxjs/toolkit";
import {SLIDER_CARDS_RECEIVED} from "src/shared/state/constants/actionTypes"


/**
 * @property {SlideImage[]} images
 */
const initialState = {
    images: [],
};

const sliderCardsReceived = (state, action) => ({
    images: action.payload
});


export const sliderImagesReducer = createReducer(initialState, builder => {
    return builder
        .addCase(SLIDER_CARDS_RECEIVED, sliderCardsReceived)
        .addDefaultCase(state => state);
});