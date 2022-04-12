

/**
 * Проверка наличия флага в перечислении.
 * @param {number} enm - перечисление, несколько флагов
 * @param {number} flag - перечисление, флаг
 * @return {boolean} - результат
 */
const hasFlag = (enm, flag) => {
    return ((enm & flag) === flag);
};



export const Enum = {
    hasFlag
};


/**
 *
 * @param {ProductCardInfo[]} products
 * @param {Categories} category
 * @return {ProductCardInfo[]}
 */
const filterProductsByCategory = (products, category) => {
    return products.filter(x => Enum.hasFlag(x.category, category));
};


/**
 * Открывает ссылку в новом окне.
 * @param {string} url
 */
const openUrlInNewWindow = (url) => {
    if (url)
        window.open(url, "_blank", "noopener,noreferrer");
};


/**
 * Объект, содержащий общие методы для всего проекта.
 */
export const Utils = {
    Enum,
    filterProductsByCategory,
    openUrlInNewWindow
};