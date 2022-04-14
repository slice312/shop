import {createReducer} from "@reduxjs/toolkit";
import lo from "lodash";
import {Categories} from "src/shared/constants";
import {
    PRODUCTS_RESET,
    PRODUCTS_SET,
    PRODUCTS_IS_FETCHING,
    PRODUCTS_ON_SERVER_QTY_SET,
    PRODUCTS_PUSHED,
    PRODUCTS_BESTSELLERS_IS_FETCHING,
    PRODUCTS_BESTSELLERS_PUSHED,
    PRODUCTS_NOVELTIES_IS_FETCHING,
    PRODUCTS_NOVELTIES_PUSHED,
    PRODUCT_FAVORITE_TOGGLED
} from "src/shared/state/actionTypes";
import {Enum} from "src/shared/utils";


/**
 * @typedef ProductCardInfo
 * @property {ProductInfo} product
 * @property {Categories} category
 */
/**
 * @property {ProductCardInfo[]} products
 * @property {number} totalQtyOnServer
 * @property {boolean} productsIsFetching
 * @property {boolean} bestSellersIsFetching
 * @property {boolean} noveltiesIsFetching
 */
const initialState = {
    products: [],
    totalQtyOnServer: 0,
    productsIsFetching: false,  // TODO: можно наверное, надо чекнуть, пока это только работает для загрузки на странице Избранное
    bestSellersIsFetching: false, // TODO: а это нельзя заменить на одну перменную isFetching?
    noveltiesIsFetching: false
};


const productsReset = (state, action) => ({
    ...state,
    products: []
});

const productsSet = (state, action) => ({
    ...state,
    products: action.payload
        .map(x => ({
            product: x,
            category: Categories.None
        }))
});

const caseProductsIsFetching = (state, action) => ({
    ...state,
    bestSellersIsFetching: action.payload
});

const caseProductsOnServerQtySet = (state, action) => ({
    ...state,
    totalQtyOnServer: action.payload
});



const setBestsellersFetching = (state, action) => ({
    ...state,
    productsIsFetching: action.payload
});


const productsBestsellersPushed = (state, action) => {
    return productsPushed(state, action, Categories.Bestsellers);
};


const setNoveltiesFetching = (state, action) => ({
    ...state,
    noveltiesIsFetching: action.payload
});


const productsNoveltiesPushed = (state, action) => {
    return productsPushed(state, action, Categories.Novelties);
};


const productsPushed = (state, action, category) => {
    if (!action.payload?.length)
        return state;

    const payload = action.payload
        .map(x => ({
            product: x,
            category: category
        }));

    const existedProducts = lo.intersectionWith(state.products, payload, productCardInfoEqualityComparer)
    const products = copyProductsWithChangeCategory(state.products, existedProducts, category);
    const newProducts = lo.differenceWith(payload, existedProducts, productCardInfoEqualityComparer);
    products.push(...newProducts);

    return {
        ...state,
        products
    };
};


const caseProductsPushed = (state, action) => ({
    ...state,
    products: [...state.products, ...convertToProductCardInfo(action.payload)]
});

const convertToProductCardInfo = (productsRaw) => {
    return productsRaw.map(x => ({
            product: x,
            category: Categories.None
        }));
};




const productCardInfoEqualityComparer = (obj1, obj2) => {
    return obj1 && obj2
        && obj1.product?.id === obj2.product?.id;
};


const copyProductsWithChangeCategory = (srcProducts, existed, category) => {
    const existedIdSet = new Set(existed.map(x => x.product.id));
    return srcProducts.map(x => {
        if (!existedIdSet.has(x.product.id))
            return x;
        if (Enum.hasFlag(x.category, category))
            return x;

        return {
            ...x,
            category: x.category | category
        };
    });
};


const productFavoriteToggled = (state, action) => {
    return {
        ...state,
        products: state.products.map(x => {
            if (x.product.id === action.payload) {
                return {
                    ...x,
                    product: {
                        ...x.product,
                        isFavorite: !x.product.isFavorite
                    }
                }
            }
            return x;
        })
    };
};


export const productsReducer = createReducer(initialState, builder => {
    return builder
        .addCase(PRODUCTS_RESET, productsReset)
        .addCase(PRODUCTS_SET, productsSet)
        .addCase(PRODUCTS_IS_FETCHING, caseProductsIsFetching)
        .addCase(PRODUCTS_ON_SERVER_QTY_SET, caseProductsOnServerQtySet)
        .addCase(PRODUCTS_PUSHED, caseProductsPushed)
        .addCase(PRODUCTS_BESTSELLERS_IS_FETCHING, setBestsellersFetching)
        .addCase(PRODUCTS_BESTSELLERS_PUSHED, productsBestsellersPushed)
        .addCase(PRODUCTS_NOVELTIES_IS_FETCHING, setNoveltiesFetching)
        .addCase(PRODUCTS_NOVELTIES_PUSHED, productsNoveltiesPushed)
        .addCase(PRODUCT_FAVORITE_TOGGLED, productFavoriteToggled)
        .addDefaultCase(state => state);
});