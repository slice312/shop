import React from "react";
import {useNavigate} from "react-router-dom";
import {Api} from "src/shared/utils/api";
import lo from "lodash";
import {DB} from "src/assets/mock/db";


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



const useProjectNavigation = () => {
    const navigate = useNavigate();

    const navigateToProductPage = (productId) => navigate(`/products/${productId}`);

    const navigateToCollectionPage = (collectionId) => navigate(`/collections/${collectionId}`);

    const navigateToFavorites = () => navigate(`/favorites`);

    const navigateToBasket = () => navigate(`/basket`);

    const navigateToSearch = (args) => navigate(`/search`, args);


    return {
        navigateToProductPage,
        navigateToCollectionPage,
        navigateToFavorites,
        navigateToBasket,
        navigateToSearch
    };
};


function useOutsideAlerter(ref, callback) {
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target))
                callback?.();
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);
}


/**
 * Открывает ссылку в новом окне.
 * @param {string} url
 */
const openUrlInNewWindow = (url) => {
    if (url)
        window.open(url, "_blank", "noopener,noreferrer");
};


/**
 * Создает ключ для товара в корзине, для сохранения в {@link localStorage}.
 * @param {string} productId - Id товара
 * @param {string} color - Цвет товара
 * @return {string} - Ключ товара в корзине
 */
const getBasketItemKey = (productId, color) => {
    return `${productId}|${color}`;
};


/**
 * Объект, содержащий общие методы для всего проекта.
 */
export const Utils = {
    Enum,
    Hooks: {
        useProjectNavigation,
        useOutsideAlerter
    },
    Data: {
        filterProductsByCategory
    },
    openUrlInNewWindow,
    getBasketItemKey
};