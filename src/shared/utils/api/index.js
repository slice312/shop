import {axiosInstance} from "./axiosInstance";
import {mockIt} from "./axiosMockedApi";

mockIt(axiosInstance); // TODO: удалить после реализации API


/**
 * @typedef {import("axios").AxiosResponse} AxiosResponse
 */


const getHomeSliderImages = async () => {
    return await axiosInstance.get("slider/images");
};

const getBestsellers = async (limit, offset = 0) => {
    return await axiosInstance.get(`cards/bestsellers?limit=${limit}&offset=${offset}`);
};

const getNovelties = async (limit, offset = 0) => {
    return await axiosInstance.get(`cards/novelties?limit=${limit}&offset=${offset}`);
};

const getCollections = async (limit, offset = 0) => {
    return await axiosInstance.get(`collections?limit=${limit}&offset=${offset}`);
};

/**
 * @param limit
 * @param offset
 * @return {Promise<AxiosResponse<NewsInfo[]>>}
 */
const getNews = async (limit, offset = 0) => {
    return await axiosInstance.get(`news?limit=${limit}&offset=${offset}`);
};

const putRequestCallBack = async (phoneNumber, name) => {
    return await axiosInstance.put(`callback?phone=${phoneNumber}&name=${name}`);
};

const getCommonSiteInfo = async () => {
    return await axiosInstance.get("common-site-info");
};

const getPublicOffer = async () => {
    return await axiosInstance.get("public-offer");
};

// TODO: ПОИСК https://stackoverflow.com/questions/51726391/how-to-create-a-search-field-in-reactjs
// TODO: ПОИСК https://github.com/WebDevSimplified/React-Infinite-Scrolling/blob/master/src/useBookSearch.js
// axios cancelation token


// TODO: разбить на группы
export const Api = {
    getHomeSliderImages,
    getBestsellers,
    getNovelties,
    getCollections,
    getNews,

    siteService: {
        putRequestCallBack,
        getCommonSiteInfo,
        getPublicOffer
    }
};