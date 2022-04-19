import {createReducer} from "@reduxjs/toolkit";
import {HOME_AD_SLIDE_IMAGES_RECEIVED} from "src/shared/state/actionTypes"


/**
 * @property {AdSlideImage[]} slides
 */
const initialState = {
    slides: []
};


const homeAdSlidesReceived = (state, action) => ({
    slides: action.payload
});


export const homeAdSlideImagesReducer = createReducer(initialState, builder => {
    return builder
        .addCase(HOME_AD_SLIDE_IMAGES_RECEIVED, homeAdSlidesReceived)
        .addDefaultCase(state => state);
});