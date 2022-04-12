import {axiosInstance} from "./axiosInstance";
import {mockIt} from "./axiosMockedApi";

mockIt(axiosInstance); // TODO: удалить после реализации API


//<editor-fold desc="typedefs">

/**
 * @typedef {import("axios").AxiosResponse} AxiosResponse
 */

/**
 * @global
 * @typedef CommonSiteInfo - Общая информация о сайте
 * @property {string} companyName - Подпись компании или название
 * @property {string} headerLogo - Лого для хедера
 * @property {string} footerLogo - Лого для футера
 * @property {string} mainPhoneNumber - Основной номер телефона
 * @property {string} extraPhoneNumbers - Доп. номера телефонов
 * @property {string} email - Email
 * @property {string} telegramUrl - Ссылка на telegram
 * @property {string} whatsappUrl - Ссылка на whatsapp
 */

/**
 * @global
 * @typedef FaqRecord - FAQ
 * @property {string} question - Вопрос
 * @property {string} answer - Ответ
 */

/**
 * @global
 * @typedef AboutInfo - Информация о нас (о магазине)
 * @property {string} text - Вопрос
 * @property {string[]} images - Ссылки на изображения
 */

/**
 * @global
 * @typedef AdSlideImage - Рекламный слайд
 * @property {string} image - Ссылка на изображение
 * @property {string} link - Ссылка на редирект
 */

/**
 * @global
 * @typedef NewsInfo - Новости
 * @property {string} title - Заголовок
 * @property {string} image - Ссылка на картинку
 * @property {string} text - Текст новости
 */

/**
 * @global
 * @typedef CollectionInfo - Коллекция
 * @property {string} id - Уникальный ключ (GUID)
 * @property {string} title - Заголовок
 * @property {string} image - Ссылка на картинку
 */

/**
 * @global
 * @typedef ProductInfo - Карточка товара (одежда)
 * @property {string} id - Уникальный ключ (GUID)
 * @property {string} collectionId - Внешней ключ (GUID) к коллекции {@link CollectionInfo}
 * @property {string} title - Название
 * @property {string} vendorCode - Артикул
 * @property {number} price - Цена
 * @property {number} qty - Количество
 * @property {number} discount - Скидка
 * @property {boolean} isFavorite - Признак "Избранный"
 * @property {string} size - Размер
 * @property {string[]} images - Ссылки на изображения товара
 * @property {string[]} colors - Цвета товара
 * @property {string} material - Материал
 * @property {string} fabricStructure - Состав ткани
 * @property {string} description - Описание товара
 */

//</editor-fold desc="typedefs">


/**
 * Получение рекламных слайдов.
 * @returns {Promise<AxiosResponse<AdSlideImage[]>>}
 */
const getHomeAdSlideImages = async () => {
    return await axiosInstance.get("home/ad-slides");
};

/**
 * Получение товаров категории "Хиты продаж".
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @return {Promise<AxiosResponse<ProductInfo[]>>}
 */
const getBestsellers = async (limit, offset = 0) => {
    return await axiosInstance.get(`products/bestsellers?limit=${limit}&offset=${offset}`);
};

/**
 * Получение товаров категории "Новинки".
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @return {Promise<AxiosResponse<ProductInfo[]>>}
 */
const getNovelties = async (limit, offset = 0) => {
    return await axiosInstance.get(`products/novelties?limit=${limit}&offset=${offset}`);
};

const getProduct = async (productId) => {
    return await axiosInstance.get(`products/${productId}`);
};

/**
 * @typedef ProductsResponse
 * @property {ProductInfo[]} products
 * @property {number} totalQty
 */
/**
 * Получение товаров по коллекции.
 * @param {string} collectionId - Id коллекции
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @returns {Promise<AxiosResponse<ProductsResponse>>}
 */
const getProductsByCollection = async (collectionId, limit, offset) => {
    return await axiosInstance.get(`products/collection/${collectionId}?limit=${limit}&offset=${offset}`);
};


/**
 * @typedef CollectionsResponse
 * @property {CollectionInfo[]} collections
 * @property {number} totalQty
 */
/**
 * Получение коллекций товаров.
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @return {Promise<AxiosResponse<CollectionsResponse>>}
 */
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


const setProductFavoriteFlag = async (productId, isFavorite) => {
    return await axiosInstance.put(`products/${productId}?favorite=${isFavorite}`);
};

// TODO: comment
const getProductsByName = async (name) => {
    return await axiosInstance.get(`products?name=${name}`);
};


/**
 *
 * @param {string[]} productsIds
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @returns {Promise<void>}
 */
const getProductsByIds = async (productsIds, limit, offset) => {
    return await axiosInstance.post(`products/get?limit=${limit}&offset=${offset}`, productsIds);
};

/**
 * Заказать обратный звонок.
 * @param {string} phoneNumber - Номер телефона
 * @param {string} name - Имя заказавшего юзера
 * @returns {Promise<AxiosResponse<any>>}
 */
const sendRequestCallback = async (phoneNumber, name) => {
    return await axiosInstance.put(`callback?phone=${phoneNumber}&name=${name}`);
};

/**
 * Получение общей информации о сайте.
 * @return {Promise<AxiosResponse<CommonSiteInfo>>}
 */
const getCommonSiteInfo = async () => {
    return await axiosInstance.get("common-site-info");
};

/**
 * Получение текста публичной оферты.
 * @returns {Promise<AxiosResponse<string>>}
 */
const getPublicOffer = async () => {
    return await axiosInstance.get("public-offer");
};

/**
 * Получение FAQ.
 * @returns {Promise<AxiosResponse<FaqRecord[]>>}
 */
const getFaq = async () => {
    return await axiosInstance.get("faq");
};

/**
 * Получение FAQ.
 * @returns {Promise<AxiosResponse<AboutInfo>>}
 */
const getAboutInfo = async () => {
    return await axiosInstance.get("about-info");
};

// TODO: ПОИСК https://stackoverflow.com/questions/51726391/how-to-create-a-search-field-in-reactjs
// TODO: ПОИСК https://github.com/WebDevSimplified/React-Infinite-Scrolling/blob/master/src/useBookSearch.js
// axios cancelation token


// TODO: разбить на группы
// TODO: тут у меня нейминг неправильный, всеему остальному коду не нужно знать какой http глагол использутся
// поэтому просто переименовать на логичные именя описаывающие действия
export const Api = {
    getHomeAdSlideImages,

    getBestsellers,
    getNovelties,
    getProduct,
    getProductsByCollection,
    getCollections,
    getNews,

    getProductsByName,
    getProductsByIds,

    product: {
        setProductFavoriteFlag
    },

    SiteService: {
        sendRequestCallback,
        getCommonSiteInfo,
        getPublicOffer,
        getFaq,
        getAboutInfo
    }
};


