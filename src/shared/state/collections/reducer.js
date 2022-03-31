import {createReducer} from "@reduxjs/toolkit";
import {
    COLLECTIONS_RESET,
    COLLECTIONS_PUSHED
} from "src/shared/state/constants/actionTypes";


/** // TODO: добавить jsdoc typedef
 * @property {any} bestsellers
 * @property {any} novelties
 */
const initialState = {
    collections: []
};


const collectionsReset = (state, action) => ({
    ...state,
    collections: [],
});

const collectionsPushed = (state, action) => ({
    ...state,
    collections: [...state.collections, ...action.payload]
});


export const collectionsReducer = createReducer(initialState, builder => {
    return builder
        .addCase(COLLECTIONS_RESET, collectionsReset)
        .addCase(COLLECTIONS_PUSHED, collectionsPushed)
        .addDefaultCase(state => state);
});