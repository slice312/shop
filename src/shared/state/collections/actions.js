import {
    COLLECTIONS_RESET,
    COLLECTIONS_PUSHED
} from "src/shared/state/constants/actionTypes";
import {Api} from "src/shared/utils/api";


export const collectionsReset = () => ({type: COLLECTIONS_RESET});

export const collectionsPushed = (collections) =>
    ({type: COLLECTIONS_PUSHED, payload: collections});

/**
 * ThunkCreator.
 * Загружает коллекции.
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


// TODO: не надо каждый раз из базы брать