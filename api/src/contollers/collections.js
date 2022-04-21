import lo from "lodash";
import {Utils} from "src/utils";
import {DB} from "src/assets/mock/db";


const collection = (request, response) => {
    const collectionId = request.params.collection_id;
    const collection = DB.collections
        .find(x => x.id === collectionId);

    return (collection)
        ? Utils.sendJsonResponse(response, 200, collection)
        : Utils.sendJsonResponse(response, 404, null);
};


const collections = (request, response) => {
    const limit = Number(request.query.limit) || Number.MAX_SAFE_INTEGER;
    const offset = Number(request.query.offset);

    if (typeof request.query.notEmpty !== "undefined") {
        const collections = lo.intersectionWith(DB.collections, DB.cards,
            (collection, product) => collection.id === product.collectionId);
        const data = {
            collections: lo.chain(collections)
                .drop(offset)
                .take(limit),
            totalQty: collections.length
        };

        Utils.sendJsonResponse(response, 200, data);
    } else {
        const data = {
            collections: lo.chain(DB.collections)
                .drop(offset)
                .take(limit),
            totalQty: DB.collections.length
        };

        Utils.sendJsonResponse(response, 200, data);
    }
};


export const Collections = {
    collection,
    collections
};