import axios from "axios";
import moment from "moment";
import MockAdapter from "axios-mock-adapter";


// TODO: https://www.npmjs.com/package/react-native-config
const WEB_API_URL = "192.168.13.109:80";

const instance = axios.create({
    baseURL: `http://${WEB_API_URL}/api/`,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 15_000
});

instance.interceptors.request.use(request => {
    const date = moment(Date.now()).format("DD.MM.YYYY hh:mm:ss");
    console.log(`${date}: [${request.method.toUpperCase()}] ${request.baseURL}/${request.url}`);
    return request;
});

const mockApi = new MockAdapter(instance, {delayResponse: 100});




const getHomeSliderImages = async () => {
    return await instance.get("/slider/images");
}
mockApi.onGet("/slider/images")
    .reply(config => {
        // Пока загрузил картинки сюда https://trio-lyro.imgbb.com
        // вход через trio.bone@gmail.com
        const images = [
            {src: `https://i.ibb.co/zNSmhCT/slice-Image.png`, link: `https://trio-lyro.imgbb.com`},
            {src: `https://i.ibb.co/gPP0pmN/slice-Image.png`, link: null},
            {src: `https://i.ibb.co/72sRTbX/slice-Image2.png`, link: null},
        ]
        return [200, {images}];
    });


export const Api = {
    getHomeSliderImages
};


