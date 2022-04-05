import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleWare from "redux-thunk";
import {commonSiteInfoReducer} from "./commonSiteInfo/reducer";
import {sliderImagesReducer} from "./slider/reducer";
import {productsReducer} from "./products/reducer";
import {collectionsReducer} from "./collections/reducer";
import {newsReducer} from "./news/reducer";



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleWare)
);

const reducers = combineReducers({
    siteCommonInfo: commonSiteInfoReducer,
    homeSlider: sliderImagesReducer,
    products: productsReducer,
    collections: collectionsReducer,
    news: newsReducer
});


export const store = createStore(reducers, enhancer);