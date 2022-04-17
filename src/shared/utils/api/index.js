import {axiosInstance} from "./axiosInstance";
import {mockIt} from "./axiosMockedApi";

mockIt(axiosInstance); // TODO: удалить после реализации бекенда


//<editor-fold desc="typedefs">

/**
 * @typedef {import("axios").AxiosResponse} AxiosResponse
 */

/**
 * @typedef CommonSiteInfo - Общая информация о сайте
 * @property {string} companyName - Подпись компании или название
 * @property {string} headerLogo - Лого для хедера
 * @property {string} footerLogo - Лого для футера
 * @property {string} mainPhoneNumber - Основной номер телефона
 * @property {string} extraPhoneNumbers - Доп. номера телефонов
 * @property {string} email - Email
 * @property {string} telegramUrl - Ссылка на telegram
 * @property {string} whatsappUrl - Ссылка на whatsapp
 * @property {string} instagramUrl - Ссылка на whatsapp
 */

/**
 * @typedef FaqRecord - FAQ
 * @property {string} question - Вопрос
 * @property {string} answer - Ответ
 */

/**
 * @typedef AboutInfo - Информация о нас (о магазине)
 * @property {string} text - Вопрос
 * @property {string[]} images - Ссылки на изображения
 */

/**
 * @typedef AdSlideImage - Рекламный слайд
 * @property {string} image - Ссылка на изображение
 * @property {string} link - Ссылка на редирект
 */

/**
 * @typedef NewsInfo - Новости
 * @property {string} title - Заголовок
 * @property {string} image - Ссылка на картинку
 * @property {string} text - Текст новости
 */

/**
 * @typedef CollectionInfo - Коллекция
 * @property {string} id - Уникальный ключ (GUID)
 * @property {string} title - Заголовок
 * @property {string} image - Ссылка на картинку
 */

/**
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

/**
 * @typedef OrderInfo - Информация о заказе
 * @property {string} name - Имя
 * @property {string} surname - Фамилия
 * @property {string} email - Email
 * @property {string} phone - Телефон
 * @property {string} country - Страна
 * @property {string} city - Город
 */

/**
 * @typedef BasketItem
 * @property {string} productId - Id товара
 * @property {string} color - Цвет товара
 * @property {number} qty - Кол-во
 */


/**
 * @typedef ProductsResponse
 * @property {ProductInfo[]} products
 * @property {number} totalQty
 */

/**
 * @typedef CollectionsResponse
 * @property {CollectionInfo[]} collections
 * @property {number} totalQty
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
 * // TODO: переделать ответ на ProductsResponse
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
 * Получение товаров по коллекции.
 * @param {string} collectionId - Id коллекции
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number?} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @returns {Promise<AxiosResponse<ProductsResponse>>}
 */
const getProductsByCollection = async (collectionId, limit, offset = 0) => {
    return await axiosInstance.get(`products/collection/${collectionId}?limit=${limit}&offset=${offset}`);
};

/**
 * Получить коллекцию по id.
 * @param {string} collectionId - Id коллекции
 * @returns {Promise<AxiosResponse<CollectionInfo>>}
 */
const getCollection = async (collectionId) => {
    return await axiosInstance.get(`collections/${collectionId}`);
};

/**
 * Получение коллекций товаров.
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number?} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @return {Promise<AxiosResponse<CollectionsResponse>>}
 */
const getCollections = async (limit, offset = 0) => {
    return await axiosInstance.get(`collections?limit=${limit}&offset=${offset}`);
};

/**
 *
 * @param {number} limit - Максимальное кол-во объектов в ответе
 * @param {number} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @return {Promise<AxiosResponse<CollectionsResponse>>}
 */
const getCollectionsNotEmpty = async (limit, offset = 0) => {
    return await axiosInstance.get(`collections?notEmpty&limit=${limit}&offset=${offset}`);
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
 * @param {number?} limit - Максимальное кол-во объектов в ответе
 * @param {number?} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @returns {Promise<AxiosResponse<any>>}
 */
const getProductsByIds = async (productsIds, limit, offset = 0) => {
    limit = (limit) ? limit : 0;
    return await axiosInstance.post(`products/get?limit=${limit}&offset=${offset}`, productsIds);
};

/**
 * Получение избранных товаров.
 * @param {number?} limit - Максимальное кол-во объектов в ответе
 * @param {number?} offset - Смещение, сервер пропускает первые N объектов в ответе
 * @returns {Promise<AxiosResponse<ProductsResponse>>} - Список товаров, общее кол-во в базе
 */
const getFavoriteProducts = async (limit, offset = 0) => {
    limit = (limit) ? limit : 0;
    return await axiosInstance.get(`products/favorites?limit=${limit}&offset=${offset}`);
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
 * Заказать товары
 * @param {OrderInfo} orderInfo
 * @param {BasketItem[]} basketItems
 * @return Promise<AxiosResponse<string>>
 */
const sendOrderInfo = async (orderInfo, basketItems) => {
    return await axiosInstance.post("order", {
        orderInfo,
        basketItems
    });
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


export const Api = {
    getHomeAdSlideImages,

    getNews,


    Collections: {
        getCollections,
        getCollection,
        getCollectionsNotEmpty,
    },

    Products: {
        getBestsellers,
        getNovelties,
        setProductFavoriteFlag,
        getProductsByCollection,
        getProduct,
        getProductsByName,
        getProductsByIds,
        getFavoriteProducts
    },


    SiteService: {
        sendRequestCallback,
        sendOrderInfo,
        getCommonSiteInfo,
        getPublicOffer,
        getFaq,
        getAboutInfo
    }
};


