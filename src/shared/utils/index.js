

/**
 *
 * @param {number} enm
 * @param {number} flag
 * @return {boolean}
 */
const hasFlag = (enm, flag) => {
    return ((enm & flag) === flag);
};

const addFlag = (enm, flag) => {
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



export const Utils = {
    Enum,
    filterProductsByCategory
};