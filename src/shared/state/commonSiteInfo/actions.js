import {COMMON_SITE_INFO_RECEIVED} from "src/shared/state/actionTypes";
import {Api} from "src/shared/utils/api";


export const commonSiteInfoReceived = (info) =>
    ({type: COMMON_SITE_INFO_RECEIVED, payload: info});


/**
 * ThunkCreator.
 * Загружает коллекци.
 */
export const setCommonSiteInfo = () => {
    return async (dispatch, getState) => {
        try {
            const response = await Api.SiteService.getCommonSiteInfo();
            if (response.status === 200) {
                console.log("setCommonSiteInfo success", response.data);
                dispatch(commonSiteInfoReceived(response.data));
            } else {
                console.error("setCommonSiteInfo error", response.status);
            }
        } catch (err) {
            console.error("setCommonSiteInfo error", err);
        }
    };
};
