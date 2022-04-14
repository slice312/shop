import {createReducer} from "@reduxjs/toolkit";
import {
    COLLECTIONS_RESET,
    COLLECTIONS_IS_FETCHING,
    COLLECTIONS_PUSHED
} from "src/shared/state/actionTypes";


/**
 * @property {CollectionInfo[]} collections
 * @property {number} totalQtyOnServer
 * @property {boolean} collectionsIsFetching
 */
const initialState = {
    collections: [],
    totalQtyOnServer: 0,
    collectionsIsFetching: false
};


const caseCollectionsReset = (state, action) => ({
    ...state,
    collections: [],
    totalQtyOnServer: 0,
    collectionsIsFetching: false
});

const caseCollectionsIsFetching = (state, action) => ({
    ...state,
    collectionsIsFetching: action.payload
});



const caseCollectionsPushed = (state, action) => ({
    ...state,
    collections: [...state.collections, ...action.payload.collections],
    totalQtyOnServer: action.payload.totalQty
});


export const collectionsReducer = createReducer(initialState, builder => {
    return builder
        .addCase(COLLECTIONS_RESET, caseCollectionsReset)
        .addCase(COLLECTIONS_IS_FETCHING, caseCollectionsIsFetching)
        .addCase(COLLECTIONS_PUSHED, caseCollectionsPushed)
        .addDefaultCase(state => state);
});