import axios from "axios";
import moment from "moment";
import {Auth} from "src/shared/utils/auth";
import {getAuth} from "firebase/auth";


const WEB_API_URL = process.env.WEB_API_URL || "localhost:8081";


const axiosInstance = axios.create({
    baseURL: `http://${WEB_API_URL}/api`,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 5_000 // TODO: вернуть 20_000
});

axiosInstance.interceptors.request.use(request => {
    const date = moment(Date.now()).format("DD.MM.YYYY hh:mm:ss");
    console.log(`${date}: [${request.method.toUpperCase()}] ${request.baseURL}/${request.url}`);
    return request;
});


// TODO: взять токен из firebase
axiosInstance.interceptors.request.use(async request => {
    const auth = getAuth();
    request.headers.Authorization = `Bearer ${Auth.getToken()}`;
    return request;
});

export {axiosInstance};