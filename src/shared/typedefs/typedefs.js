/**
 * @global
 * @typedef CommonSiteInfo - Общая информация о сайте
 * @property {string} headerLogo - Ссылка на картинку лого сайта
 * @property {string} phoneNumber - Номер телефона
 * @property {string} telegramUrl - Ссылка на telegram
 * @property {string} whatsappUrl - Ссылка на whatsapp
 */


/**
 * @global
 * @typedef SlideImage - Комунальная услуга
 * @property {string} src - Ссылка на картинку
 * @property {string} url - Ссылка на редирект
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
 * @typedef ProductCardInfo - Карточка товара (одежда)
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

export {};