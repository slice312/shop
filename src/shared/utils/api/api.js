import axios from "axios";
import moment from "moment";

import mockAxios from "jest-mock-axios"; //https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/

// TODO: https://www.npmjs.com/package/react-native-config
const WEB_API_URL = "192.168.13.109:80";

const instance = axios.create({
    baseURL: `http://${WEB_API_URL}/api/WebApi`,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 15000
});

instance.interceptors.request.use(request => {
    const date = moment(Date.now()).format("DD.MM.YYYY hh:mm:ss");
    console.log(`${date}: [${request.method.toUpperCase()}] ${request.baseURL}/${request.url}`);
    return request;
});



const getHomeSliderImages = async () => {
    // Пока загрузил картинки сюда https://trio-lyro.imgbb.com
    // вход через trio.bone@gmail.com

    const images = [
        {url: `https://i.ibb.co/zNSmhCT/slice-Image.png`, link: ``},
        {url: `https://i.ibb.co/zNSmhCT/slice-Image.png`, link: `https://trio-lyro.imgbb.com`},
        {url: `https://i.ibb.co/zNSmhCT/slice-Image.png`, link: `https://trio-lyro.imgbb.com`},
        {url: `https://i.ibb.co/zNSmhCT/slice-Image.png`, link: `https://trio-lyro.imgbb.com`}
    ]

    return await images;
}



export const Api = {
    getHomeSliderImages
};