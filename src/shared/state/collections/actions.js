import {
    COLLECTIONS_RESET,
    COLLECTIONS_PUSHED
} from "src/shared/state/constants/actionTypes";
import {Api} from "src/shared/utils/api";


export const collectionsReset = () => ({type: COLLECTIONS_RESET});

export const collectionsPushed = (data) => ({type: COLLECTIONS_PUSHED, payload: data});

/**
 * ThunkCreator.
 * Загружает коллекции, добавляя новые объекты в существующим.
 */
export const pushCollections = (batchSize) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const loaded = state.collections.collections.length;
            const response = await Api.getCollections(batchSize, loaded);
            if (response.status === 200) {
                console.log("pushCollections success", response.data);
                dispatch(collectionsPushed(response.data));
            } else {
                console.error("pushCollections error", response.status);
            }
        } catch (err) {
            console.error("pushCollections error", err);
        }
    };
};

/**
 * ThunkCreator.
 * Загружает коллекции, перезаписывая старый state.
 */
export const loadCollections = (limit, offset) => {
    return async (dispatch, getState) => {
        try {
            const response = await Api.getCollections(limit, offset);
            if (response.status === 200) {
                console.log("loadCollections success", response.data);
                dispatch(collectionsReset());
                dispatch(collectionsPushed(response.data));
            } else {
                console.error("loadCollections error", response.status);
            }
        } catch (err) {
            console.error("loadCollections error", err);
        }
    };
};