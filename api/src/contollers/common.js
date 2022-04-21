import lo from "lodash";
import {Utils} from "src/utils";
import {DB} from "src/assets/mock/db";


const homeAdSlideImages = (request, response) => {
    Utils.sendJsonResponse(response, 200, DB.slides);
};


const news = (request, response) => {
    const limit = Number(request.query.limit);
    const offset = Number(request.query.offset);
    const data = lo.chain(DB.news)
        .drop(offset)
        .take(limit);
    Utils.sendJsonResponse(response, 200, data);
};


const commonSiteInfo = (request, response) => {
    Utils.sendJsonResponse(response, 200, DB.commonSiteInfo);
};


const aboutInfo = (request, response) => {
    Utils.sendJsonResponse(response, 200, DB.about);
};


const usAdvantages = (request, response) => {
    Utils.sendJsonResponse(response, 200, DB.advantages);
};


const faq = (request, response) => {
    Utils.sendJsonResponse(response, 200, DB.faq);
};


const publicOffer = (request, response) => {
    Utils.sendJsonResponse(response, 200, DB.publicOfferText);
};


export const Common = {
    homeAdSlideImages,
    news,
    commonSiteInfo,
    aboutInfo,
    usAdvantages,
    faq,
    publicOffer
};