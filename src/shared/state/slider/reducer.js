import {createReducer} from "@reduxjs/toolkit";
import {SLIDER_IMAGES_RECEIVED} from "src/shared/state/constants/actionTypes"


/**
 * @property {SlideImage[]} images
 */
const initialState = {
    images: [],
};

const sliderImagesReceived = (state, action) => ({
    images: action.payload
});


export const sliderImagesReducer = createReducer(initialState, builder => {
    return builder
        .addCase(SLIDER_IMAGES_RECEIVED, sliderImagesReceived)
        .addDefaultCase(state => state);
});