import lo from "lodash";
import {Utils} from "src/utils";
import {DB} from "src/assets/mock/db";


const product = (request, response) => {
    const productId = request.params.product_id;
    const product = DB.cards.find(x => x.id === productId);
    if (product)
        Utils.sendJsonResponse(response, 200, product);
    else
        Utils.sendJsonResponse(response, 404, null);
};


const productsByName = (request, response) => {
    const name = request.query.name.toUpperCase();
    const result = DB.cards
        .filter(x => x.title.toUpperCase().includes(name))
        .map(x => ({id: x.id, title: x.title}));

    const data = {
        matches: result,
        count: result.length
    };

    Utils.sendJsonResponse(response, 200, data)
};


const productsByCollection = (request, response) => {
    const collectionId = request.params.collection_id;
    const limit = Number(request.query.limit) || Number.MAX_SAFE_INTEGER;
    const offset = Number(request.query.offset);

    const products = DB.cards
        .filter(x => x.collectionId === collectionId);

    const data = {
        products: lo.chain(products)
            .drop(offset)
            .take(limit),
        totalQty: products.length
    };

    Utils.sendJsonResponse(response, 200, data);
};


const favoriteProducts = (request, response) => {
    const limit = Number(request.query.limit) || Number.MAX_SAFE_INTEGER;
    const offset = Number(request.query.offset);

    const favorites = DB.cards
        .filter(x => x.isFavorite);

    const data = {
        products: lo.chain(favorites)
            .drop(offset)
            .take(limit),
        totalQty: favorites.length
    };

    Utils.sendJsonResponse(response, 200, data);
};


const bestsellers = (request, response) => {
    const limit = Number(request.query.limit) || Number.MAX_SAFE_INTEGER;
    const offset = Number(request.query.offset);

    const data = lo.chain(DB.cards)
        .drop(offset)
        .take(limit);

    Utils.sendJsonResponse(response, 200, data);
};


const novelties = (request, response) => {
    const limit = Number(request.query.limit) || Number.MAX_SAFE_INTEGER;
    const offset = Number(request.query.offset);

    const data = lo.chain(DB.cards)
        .drop(offset)
        .take(limit);

    Utils.sendJsonResponse(response, 200, data);
};


const productsByIds = (request, response) => {
    const limit = Number(request.query.limit) || Number.MAX_SAFE_INTEGER;
    const offset = Number(request.query.offset);

    const ids = Array.from(request.body).slice();
    console.log("body", ids);

    const existedProducts = lo.chain(DB.cards)
        .intersectionWith(ids, (x, y) => x.id === y)
        .drop(offset)
        .take(limit);
    Utils.sendJsonResponse(response, 200, existedProducts);
};


const setProductFavoriteFlag = (request, response) => {
    const productId = request.params.product_id;
    const isFavorite = request.query.favorite;

    const product = DB.cards.find(x => x.id === productId);
    if (product) {
        product.isFavorite = isFavorite === "true";
        Utils.sendJsonResponse(response, 200, "success");
    } else
        Utils.sendJsonResponse(response, 404, `product with id ${productId} not found`);
};



export const Products = {
    product,
    productsByName,
    productsByCollection,
    favoriteProducts,
    bestsellers,
    novelties,
    productsByIds,
    setProductFavoriteFlag
};