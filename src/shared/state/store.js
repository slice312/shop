import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleWare from "redux-thunk";
import {sliderImagesReducer} from "./slider/reducer";
import {cardsReducer} from "./cards/reducer";
import {collectionsReducer} from "./collections/reducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleWare)
);

const reducers = combineReducers({
    homeSlider: sliderImagesReducer,
    cards: cardsReducer,
    collections: collectionsReducer
});


export const store = createStore(reducers, enhancer);