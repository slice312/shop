const sendJsonResponse = (response, status, content) => {
    response.status(status);
    response.header("Access-Control-Allow-Origin", "*");
    response.json(content);
};


export const Utils = {
    sendJsonResponse
};