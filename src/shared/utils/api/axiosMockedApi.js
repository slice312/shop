import MockAdapter from "axios-mock-adapter";
import array from "lodash/array";
import lo from "lodash";
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

    // запрос на получение текста публичной оферты
    mockApi
        .onGet(/public-offer/)
        .reply(config => {
            return [200, DB.publicOfferText];
        });

    // запрос "заказать обратный звонок"
    mockApi
        .onPut(/callback\?phone=.+&name=.+/)
        .reply(config => [200, {message: "success"}]);

    // запрос к карточкам товаров Хиты продаж и Новинки
    mockApi
        .onGet(/products\/bestsellers\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryParams(config);
            const data = array.take(DB.cards, params.limit);
            return [200, data];
        })
        .onGet(/products\/novelties\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryParams(config);
            const data = array.take(DB.cards, params.limit);
            return [200, data];
        });

    // запрос к продуктам
    mockApi
        .onGet(/products\/(?!collection)/)
        .reply(config => {
            const params = /products\/(.+)/
                .exec(config.url);
            const id = params[1];
            const product = DB.cards.find(x => x.id === id);
            if (product)
                return [200, product];
            else
                return [404, null];
        });

    // запрос к продуктам с фильтрацией по коллекции
    mockApi
        .onGet(/products\/collection\/(.+)/) // TODO: offset тут пока не исользуются
        .reply(config => {
            const id = /collection\/(.+)\?/
                .exec(config.url)[1]
            const params = parseQueryParams(config);
            const products =  lo.chain(DB.cards.filter(x => x.collectionId === id))
                .drop(params.offset)
                .take(params.limit);

            return [200, products];
        });

    // запрос к коллекциям
    mockApi
        .onGet(/collections\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryParams(config);
            const data = {
                collections: lo.chain(DB.collections)
                    .drop(params.offset)
                    .take(params.limit),
                totalQty:  DB.collections.length
            };
            return [200, data];
        });

    // запрос к новостям
    mockApi
        .onGet(/news\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryParams(config);
            const data = array.take(DB.news, params.limit);
            return [200, data];
        });
};



