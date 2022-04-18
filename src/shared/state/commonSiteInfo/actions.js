import {COMMON_SITE_INFO_RECEIVED} from "src/shared/state/actionTypes";
import {Api} from "src/shared/utils/api";

/**
 * @param {CommonSiteInfo} info
 */
export const commonSiteInfoReceived = (info) =>
    ({type: COMMON_SITE_INFO_RECEIVED, payload: info});


/**
 * Загружает общую информацию о сайте.
 */
export const loadCommonSiteInfo = () => {
    return async (dispatch, getState) => {
        try {
            const response = await Api.Common.getCommonSiteInfo();
            if (response.status === 200) {
                console.log("loadCommonSiteInfo success", response.data);
                dispatch(commonSiteInfoReceived(response.data));
            } else {
                console.error("loadCommonSiteInfo", response.status);
            }
        } catch (err) {
            console.error("loadCommonSiteInfo", err);
        }
    };
};