import {axiosInstance} from "./axiosInstance";
import {mockIt} from "./axiosMockedApi";

mockIt(axiosInstance); // TODO: удалить после реализации API


/**
 * @typedef {import("axios").AxiosResponse} AxiosResponse
 */


const getHomeSliderImages = async () => {
    return await axiosInstance.get("slider/images");
};

/**
 * Получение товаров категории "Хиты продаж".
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @return {Promise<AxiosResponse<ProductCardInfo[]>>}
 */
const getBestsellers = async (limit, offset = 0) => {
    return await axiosInstance.get(`cards/bestsellers?limit=${limit}&offset=${offset}`);
};

/**
 * Получение товаров категории "Новинки".
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @return {Promise<AxiosResponse<ProductCardInfo[]>>}
 */
const getNovelties = async (limit, offset = 0) => {
    return await axiosInstance.get(`cards/novelties?limit=${limit}&offset=${offset}`);
};

const getCollections = async (limit, offset = 0) => {
    return await axiosInstance.get(`collections?limit=${limit}&offset=${offset}`);
};

/**
 * Получение новостей.
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @return {Promise<AxiosResponse<NewsInfo[]>>}
 */
const getNews = async (limit, offset = 0) => {
    return await axiosInstance.get(`news?limit=${limit}&offset=${offset}`);
};

const putRequestCallBack = async (phoneNumber, name) => {
    return await axiosInstance.put(`callback?phone=${phoneNumber}&name=${name}`);
};

/**
 * Получение общей информации о сайте.
 * @return {Promise<AxiosResponse<CommonSiteInfo>>}
 */
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