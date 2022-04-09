import {
    NEWS_RESET,
    NEWS_PUSHED
} from "src/shared/state/actionTypes";
import {Api} from "src/shared/utils/api";


export const newsReset = () => ({type: NEWS_RESET});

export const newsPushed = (news) => ({type: NEWS_PUSHED, payload: news});

/**
 * ThunkCreator.
 * Загружает новости.
 */
export const pushNews = (batchSize) => {
    return async (dispatch, getState) => {
        try {
            console.log("PUSH NEWS");
            const state = getState();
            const loaded = state.news.news.length;
            const response = await Api.getNews(batchSize, loaded);
            if (response.status === 200) {
                console.log("pushNews success", response.data);
                dispatch(newsPushed(response.data));
            } else {
                console.error("pushNews error", response.status);
            }
        } catch (err) {
            console.error("pushNews error", err);
        }
    };
};