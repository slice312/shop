import {createReducer} from "@reduxjs/toolkit";
import {COMMON_SITE_INFO_RECEIVED} from "src/shared/state/constants/actionTypes";


/**
 * TODO: typedef
 * @type {{whatsappUrl: string, headerLogo: string, phoneNumber: string, telegramUrl: string}}
 */
const initialState = {
    headerLogo: "",
    phoneNumber: "",
    telegramUrl: "",
    whatsappUrl: "",
};


export const commonSiteInfoReducer = createReducer(initialState, builder => {
    return builder
        .addCase(COMMON_SITE_INFO_RECEIVED, (state, action) => action.payload)
        .addDefaultCase(state => state);
});