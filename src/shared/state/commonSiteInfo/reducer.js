import {createReducer} from "@reduxjs/toolkit";
import {COMMON_SITE_INFO_RECEIVED} from "src/shared/state/actionTypes";


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
};


const commonSiteInfoReceived = (state, action) => action.payload;


export const commonSiteInfoReducer = createReducer(initialState, builder => {
    return builder
        .addCase(COMMON_SITE_INFO_RECEIVED, commonSiteInfoReceived)
        .addDefaultCase(state => state);
});