import {createReducer} from "@reduxjs/toolkit";
import {
    COMMON_SITE_INFO_RECEIVED,
    COMMON_SITE_INFO_FAVORITE_EXIST_SET
} from "src/shared/state/actionTypes";


/**
 * @type {CommonSiteInfo}
 */
const initialState = {
    companyName: "",
    headerLogo: "",
    footerLogo: "",
    mainPhoneNumber: "",
    extraPhoneNumbers: [],
    email: "",
    telegramUrl: "",
    whatsappUrl: "",
    instagramUrl: "",
    isFavoritesExist: false
};


const commonSiteInfoReceived = (state, action) => action.payload;

const caseCommonSiteInfoFavoriteExistSet = (state, action) => ({
    ...state,
    isFavoritesExist: action.payload
});




export const commonSiteInfoReducer = createReducer(initialState, builder => {
    return builder
        .addCase(COMMON_SITE_INFO_RECEIVED, commonSiteInfoReceived)
        .addCase(COMMON_SITE_INFO_FAVORITE_EXIST_SET, caseCommonSiteInfoFavoriteExistSet)
        .addDefaultCase(state => state);
});