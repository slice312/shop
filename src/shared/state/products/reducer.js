import {createReducer} from "@reduxjs/toolkit";
import lo from "lodash";
import {Categories} from "src/shared/constants";
import {
    PRODUCTS_RESET,
    PRODUCTS_BESTSELLERS_PUSHED,
    PRODUCTS_NOVELTIES_PUSHED
} from "src/shared/state/actionTypes";
import {Enum} from "src/shared/utils";


/**
 * @typedef ProductCardInfo
 * @property {ProductInfo} product
 * @property {Categories} category
 */
/**
 * @property {ProductCardInfo[]} products
 */
const initialState = {
    products: []
};


const productsReset = (state, action) => ({
    ...state,
    products: []
});


const productsBestsellersPushed = (state, action) => {
    return productsPushed(state, action, Categories.Bestsellers);
};


const productsNoveltiesPushed = (state, action) => {
    return productsPushed(state, action, Categories.Novelties);
};


const productsPushed = (state, action, category) => {
    const payload = action.payload
        .map(x => ({
            product: x,
            category: category
        }));

    const modifiedExistedProducts = lo.intersectionWith(state.products, payload, productCardInfoEqualityComparer)
        .map(x => {
            if (Enum.hasFlag(x.category, category))
                return x;
            return {
                ...x,
                category: x.category | category
            };
        });
    const prevProducts = lo.differenceWith(state.products, modifiedExistedProducts, productCardInfoEqualityComparer);
    const newProducts = lo.differenceWith(payload, modifiedExistedProducts, productCardInfoEqualityComparer);

    return {
        ...state,
        products: [
            ...prevProducts,
            ...modifiedExistedProducts,
            ...newProducts
        ]
    };
};


const productCardInfoEqualityComparer = (obj1, obj2) => {
    return obj1 && obj2
        && obj1.product?.id === obj2.product?.id;
};


export const productsReducer = createReducer(initialState, builder => {
    return builder
        .addCase(PRODUCTS_RESET, productsReset)
        .addCase(PRODUCTS_BESTSELLERS_PUSHED, productsBestsellersPushed)
        .addCase(PRODUCTS_NOVELTIES_PUSHED, productsNoveltiesPushed)
        .addDefaultCase(state => state);
});