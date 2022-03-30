import {axiosInstance} from "./axiosInstance";
import {mockIt} from "./axiosMockedApi";

mockIt(axiosInstance); // TODO: удалить после реализации API

const getHomeSliderImages = async () => {
    return await axiosInstance.get("slider/images");
}

const getBestsellers = async (limit, offset = 0) => {
    return await axiosInstance.get(`cards/bestsellers?limit=${limit}&offset=${offset}`);
};

const getNovelties = async (limit, offset = 0) => {
    return await axiosInstance.get(`cards/novelties?limit=${limit}&offset=${offset}`);
};


export const Api = {
    getHomeSliderImages,
    getBestsellers,
    getNovelties
};


