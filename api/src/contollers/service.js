import {Utils} from "src/utils";


const requestCallback = (request, response) => {
    Utils.sendJsonResponse(response, 200, {message: "success"});
};

const orderInfo = (request, response) => {
    Utils.sendJsonResponse(response, 200, {message: "success"});
};


export const Service = {
    requestCallback,
    orderInfo
};