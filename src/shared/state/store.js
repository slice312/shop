import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleWare from "redux-thunk";
import {commonSiteInfoReducer} from "./commonSiteInfo/reducer";
import {homeAdSlideImagesReducer} from "./slider/reducer";
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
    homeAdSlides: homeAdSlideImagesReducer,
    productsState: productsReducer,
    collections: collectionsReducer,
    news: newsReducer
});


export const store = createStore(reducers, enhancer);


/* TODO Переделка стейта
Общая логика:
при переходе на страницы, стейт переписывается под страницу
то есть на главное странице  8 хитов продуктов 4 новинок продуктов и 4 коллекци

Страницы поиск, избранное без новинок

 ПРОДУКТЫ
     Хиты продаж и новинки, хранят один и тот же тип, у типа нет отличительного признака
     Просто ендпоинт возращает по запросу Хитов 1 список, по запросу Новинок 2 список
     При добавлении товара в избранное, редусер должен в 2 массивах искать по айди и "изменять" объект
     потому что 1 и тот же товар может быть в новинках и хитах

     Для новинок и хитов продаж точно нужны разные ендпоинты
     Но стейт если 1 массив, с признаком в каждом товаре, то сложнее оперировать с данными
     Если 2 массива, то проще, но 2-ой массив новинок нужен только на 2-ух страницах


 КОЛЛЕКЦИИ
 Отдельный стейт редусер

 СЛАЙДЫ
    Для слайдов не нужен отдельный редусер, его надо перенести в commonSiteInfoReducer

 НОВОСТИ
    тут redux state не нужен

 */