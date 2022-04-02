import MockAdapter from "axios-mock-adapter";
import array from "lodash/array";
import {DB} from "src/assets/mock/db";



export const mockIt = (instance) => {
    const mockApi = new MockAdapter(instance, {delayResponse: 100});
    mockApi.onGet("slider/images")
        .reply(config => {
            const data = {images: DB.slides};
            return [200, data];
        });


    //TODO: найти либу для парса
    const parseQueryParams = (config) => {
        const params = /limit=(\d+)&offset=(\d+)/
            .exec(config.url);
        return {
            limit: params[1],
            offset: params[2]
        };
    };

    // запрос на получение общей информации сайта
    mockApi
        .onGet(/common-site-info/)
        .reply(config => {
            return [200, DB.commonSiteInfo];
        });

    // запрос "заказать обратный звонок"
    mockApi
        .onPut(/callback\?phone=.+&name=.+/)
        .reply(config => [200, {message: "success"}]);

    // запрос к карточкам товаров Хиты продаж и Новинки
    mockApi
        .onGet(/cards\/bestsellers\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryParams(config);
            const data = array.take(DB.cards, params.limit);
            return [200, data];
        })
        .onGet(/cards\/novelties\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryParams(config);
            const data = array.take(DB.cards, params.limit);
            return [200, data];
        });

    // запрос к коллекциям
    mockApi
        .onGet(/collections\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryParams(config);
            const data = {
                collections: array.take(DB.collections, params.limit),
                totalQty: 123// DB.collections.length TODO: так надо
            };
            return [200, data];
        });
};



