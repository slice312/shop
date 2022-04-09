import {createReducer} from "@reduxjs/toolkit";
import {
    COLLECTIONS_RESET,
    COLLECTIONS_PUSHED
} from "src/shared/state/actionTypes";


/**
 * @property {CollectionInfo[]} collections
 * @property {number} totalQty
 */
const initialState = {
    collections: [],
    totalQty: 0
};


const collectionsReset = (state, action) => ({
    ...state,
    collections: [],
    totalQty: 0
});

const collectionsPushed = (state, action) => ({
    ...state,
    collections: [...state.collections, ...action.payload.collections],
    totalQty: action.payload.totalQty
});


export const collectionsReducer = createReducer(initialState, builder => {
    return builder
        .addCase(COLLECTIONS_RESET, collectionsReset)
        .addCase(COLLECTIONS_PUSHED, collectionsPushed)
        .addDefaultCase(state => state);
});