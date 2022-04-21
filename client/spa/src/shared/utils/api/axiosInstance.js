import axios from "axios";
import moment from "moment";


const WEB_API_URL = "localhost:8081";   // TODO: в конфиг npm dotenv


const axiosInstance = axios.create({
    baseURL: `http://${WEB_API_URL}/api`,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 20_000
});

axiosInstance.interceptors.request.use(request => {
    const date = moment(Date.now()).format("DD.MM.YYYY hh:mm:ss");
    console.log(`${date}: [${request.method.toUpperCase()}] ${request.baseURL}/${request.url}`);
    return request;
});


export {axiosInstance};