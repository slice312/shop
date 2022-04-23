/**
 * [Flags]
 * Категории товаров.
 * @readonly
 * @enum {number}
 * @property Bestsellers - Хиты продаж
 * @property Novelties - Новинки
 */
export const Categories = Object.freeze({
    None: 0,
    Bestsellers: 1,
    Novelties: 2
});



export const BASKET_ITEM_LOCAL_STORAGE_PREFIX = "__bi";