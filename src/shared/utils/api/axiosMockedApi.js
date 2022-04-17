import MockAdapter from "axios-mock-adapter";
import array from "lodash/array";
import lo from "lodash";
import {DB} from "src/assets/mock/db";

// TODO: новости надо ограничить
export const mockIt = (instance) => {
    const mockApi = new MockAdapter(instance, {delayResponse: 5});
    mockApi.onGet("home/ad-slides")
        .reply(config => {
            return [200, DB.slides];
        });


    const parseQueryLimitOffsetParams = (config) => {
        const params = /limit=(\d+)&offset=(\d+)/
            .exec(config.url);
        return {
            limit: params[1],
            offset: params[2]
        };
    };

    const getURL = (config) => {
        return new URL(`${config.baseURL}/${config.url}`);
    };


    // запрос к карточкам товаров Хиты продаж и Новинки
    mockApi
        .onGet(/products\/bestsellers\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryLimitOffsetParams(config);
            const data = lo.chain(DB.cards)
                .drop(params.offset)
                .take(params.limit);
            return [200, data];
        })
        .onGet(/products\/novelties\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryLimitOffsetParams(config);
            const data = lo.chain(DB.cards.slice()) // TODO: зачем
                .drop(params.offset)
                .take(params.limit);
            return [200, data];
        });


    /**
     * @link {Api.Products.getProductsByCollection}
     */
    mockApi
        .onGet(/products\/collection\/.+/)
        .reply(config => {
            const id = /collection\/(.+)\?/
                .exec(config.url)[1]

            const url = getURL(config);
            const limit = Number(url.searchParams.get("limit")) || Number.MAX_SAFE_INTEGER;
            const offset = Number(url.searchParams.get("offset"));

            const products = DB.cards
                .filter(x => x.collectionId === id);

            const data = {
                products: lo.chain(products)
                    .drop(offset)
                    .take(limit),
                totalQty: products.length
            };

            return [200, data];
        });


    /**
     * @link {Api.Collections.getCollections}
     */
    mockApi
        .onGet(/collections\?(?!notEmpty)/)
        .reply(config => {

            const params = parseQueryLimitOffsetParams(config);
            const data = {
                collections: lo.chain(DB.collections)
                    .drop(params.offset)
                    .take(params.limit),
                totalQty: DB.collections.length
            };
            return [200, data];
        });


    /**
     * @link {Api.Collections.getCollectionsNotEmpty}
     */
    mockApi
        .onGet(/collections\?notEmpty/)
        .reply(config => {
            const url = getURL(config);
            const limit = Number(url.searchParams.get("limit")) || Number.MAX_SAFE_INTEGER;
            const offset = Number(url.searchParams.get("offset"));

            const collections = lo.intersectionWith(DB.collections, DB.cards,
                (collection, product) => collection.id === product.collectionId);
            const data = {
                collections: lo.chain(collections)
                    .drop(offset)
                    .take(limit),
                totalQty: collections.length
            };
            return [200, data];
        });

    /**
     * @link {Api.Collections.getCollection}
     */
    mockApi
        .onGet(/collections\/(?!\?)/)
        .reply(config => {
            const collectionId = /collections\/(.+)/
                .exec(config.url)[1];

            const collection = DB.collections
                .find(x => x.id === collectionId);

            return (collection)
                ? [200, collection]
                : [404, null];
        });


    /**
     * @link {Api.Products.getFavoriteProducts}
     */
    mockApi
        .onGet(/products\/favorites/)
        .reply(config => {
            const url = getURL(config);
            const limit = Number(url.searchParams.get("limit")) || Number.MAX_SAFE_INTEGER;
            const offset = Number(url.searchParams.get("offset"));
            const favorites = DB.cards
                .filter(x => x.isFavorite);

            const data = {
                products: lo.chain(favorites)
                    .drop(offset)
                    .take(limit),
                totalQty: favorites.length
            };
            return [200, data];
        });



    // запрос к новостям
    mockApi
        .onGet(/news\?limit=.+&offset=.+/)
        .reply(config => {
            const params = parseQueryLimitOffsetParams(config);
            const data = array.take(DB.news, params.limit);
            return [200, data];
        });


    /**
     * {@link Api.Products.setProductFavoriteFlag}
     */
    mockApi
        .onPut(/products\/.+\?favorite=.+/)
        .reply(config => {
            const [, productId, isFavorite] = /products\/(.+)\?favorite=(.+)/
                .exec(config.url);
            const product = DB.cards.find(x => x.id === productId);
            if (product) {
                product.isFavorite = isFavorite === "true";
                return [200, "success"];
            } else
                return [404, `product with id ${productId} not found`];
        });

    /**
     * @link {Api.Products.getProduct}
     */
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


    /**
     * @link {Api.Products.getProductsByName}
     */
    mockApi
        .onGet(/products\?name=.*/)
        .reply(config => {
            const url = getURL(config);
            const name = url.searchParams.get("name").toUpperCase();
            const result = DB.cards
                .filter(x => x.title.toUpperCase().includes(name))
                .map(x => ({id: x.id, title: x.title}));
            const data = {
                matches: result,
                count: result.length
            };
            return [200, data];
        });

    /**
     * @link {Api.Products.getProductsByIds}
     */
    mockApi
        .onPost(/products\/get\?limit=.+&offset=.+/)
        .reply(config => {
            const url = getURL(config);
            const limit = Number(url.searchParams.get("limit")) || Number.MAX_SAFE_INTEGER;
            const offset = Number(url.searchParams.get("offset"));

            const ids = JSON.parse(config.data);
            const existedProducts = lo.chain(DB.cards)
                .intersectionWith(ids, (x, y) => x.id === y)
                .drop(offset)
                .take(limit);
            return [200, existedProducts];
        });

    //<editor-fold desc="SiteService">
    /**
     * @link {Api.SiteService.sendRequestCallback}
     */
    mockApi
        .onPut(/callback\?phone=.+&name=.+/)
        .reply(config => [200, {message: "success"}]);

    /**
     * @link {Api.SiteService.sendOrderInfo}
     */
    mockApi
        .onPost(/order/)
        .reply(config => [200, {message: "success"}]);


    /**
     * @link {Api.SiteService.getCommonSiteInfo}
     */
    mockApi
        .onGet(/common-site-info/)
        .reply(config => {
            return [200, DB.commonSiteInfo];
        });

    /**
     * @link {Api.SiteService.getPublicOffer}
     */
    mockApi
        .onGet(/public-offer/)
        .reply(config => {
            return [200, DB.publicOfferText];
        });

    /**
     * @link {Api.SiteService.getFaq}
     */
    mockApi
        .onGet(/faq/)
        .reply(config => {
            return [200, DB.faq];
        });

    /**
     * @link {Api.SiteService.getAboutInfo}
     */
    mockApi
        .onGet(/about-info/)
        .reply(config => {
            return [200, DB.about];
        });
    //</editor-fold desc="SiteService">
};



