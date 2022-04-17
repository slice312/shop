import {
    COLLECTIONS_RESET,
    COLLECTIONS_IS_FETCHING,
    COLLECTIONS_PUSHED
} from "src/shared/state/actionTypes";
import {Api} from "src/shared/utils/api";


export const collectionsReset = () => ({type: COLLECTIONS_RESET});

const collectionsIsFetching = (isFetching) => ({type: COLLECTIONS_IS_FETCHING, payload: isFetching});

export const collectionsPushed = (data) => ({type: COLLECTIONS_PUSHED, payload: data});


/**
 * Загружает коллекции, перезаписывая старый state.
 * @param {number} limit - Ограничение на кол-во в ответе
 * @param {number?} offset - Смещение, по умолчанию 0
 */
export const loadCollections = (limit, offset = 0) => {
    return async (dispatch, getState) => {
        try {
            dispatch(collectionsIsFetching(true));

            const response = await Api.Collections.getCollections(limit, offset);

            if (response.status === 200) {
                dispatch(collectionsReset());
                dispatch(collectionsPushed(response.data));
                console.log("loadCollections success", response.data);
            } else {
                console.error("loadCollections error", response.status);
            }
        } catch (err) {
            console.error("loadCollections error", err);
        } finally {
            dispatch(collectionsIsFetching(false));
        }
    };
};


/**
 * Загружает коллекции, добавляя новые объекты к существующим.
 * @param {number} limit - Ограничение на кол-во в ответе
 */
export const pushCollections = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch(collectionsIsFetching(true));

            const state = getState();
            const loaded = state.collectionsState.collections.length;
            const response = await Api.Collections.getCollections(limit, loaded);

            if (response.status === 200) {
                dispatch(collectionsPushed(response.data));
                console.log("pushCollections success", response.data);
            } else {
                console.error("pushCollections error", response.status);
            }
        } catch (err) {
            console.error("pushCollections error", err);
        } finally {
            dispatch(collectionsIsFetching(false));
        }
    };
};