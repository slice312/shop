import {createReducer} from "@reduxjs/toolkit";
import {
    NEWS_RESET,
    NEWS_PUSHED
} from "src/shared/state/constants/actionTypes";


/**
 * @property {NewsInfo[]} news
 */
const initialState = {
    news: []
};


const newsReset = (state, action) => ({
    ...state,
    news: []
});

const newsPushed = (state, action) => ({
    ...state,
    news: [...state.news, ...action.payload]
});


export const newsReducer = createReducer(initialState, builder => {
    return builder
        .addCase(NEWS_RESET, newsReset)
        .addCase(NEWS_PUSHED, newsPushed)
        .addDefaultCase(state => state);
});