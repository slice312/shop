import MockAdapter from "axios-mock-adapter";
import array from "lodash/array";



export const mockIt = (instance) => {
    const mockApi = new MockAdapter(instance, {delayResponse: 100});
    mockApi.onGet("slider/images")
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


    const getCards = (config) => {
        const limit = /limit=(\d+)/
            .exec(config.url)[1];
        return array.take(DATA.cards, limit);
    }

    // 2 запрос
    mockApi
        .onGet(/cards\/bestsellers\?limit=.+&offset=.+/)
        .reply(config => {
            return [200, getCards(config)];
        })
        .onGet(/cards\/novelties\?limit=.+&offset=.+/)
        .reply(config => {
            return [200, getCards(config)];
        });
};



const DATA = {
    cards: [
        {
            id: "cbca4382-982c-4b6a-be80-b56e4f368d33",
            title: "Вечернее платье",
            price: 2700,
            discount: 50,
            isFavorite: true,
            size: "42-50",
            images: [
                `https://i.ibb.co/fGGXMQG/card1.png`,
                `https://i.ibb.co/fGGXMQG/card1.png`,
                `https://i.ibb.co/fGGXMQG/card1.png`,
                `https://i.ibb.co/fGGXMQG/card1.png`
            ],
            colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
        },
        {
            id: "33957cdf-d608-40cc-a756-92be27f34c73",
            title: "Ночное платье",
            price: 2500,
            discount: 35,
            isFavorite: false,
            size: "42-50",
            images: [
                `https://i.ibb.co/93xGpFf/card2.png`,
                `https://i.ibb.co/93xGpFf/card2.png`,
                `https://i.ibb.co/93xGpFf/card2.png`,
                `https://i.ibb.co/93xGpFf/card2.png`,
                `https://i.ibb.co/93xGpFf/card2.png`,
                `https://i.ibb.co/93xGpFf/card2.png`,
                `https://i.ibb.co/93xGpFf/card2.png`
            ],
            colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
        },
        {
            id: "ea3bc321-36ea-4699-a932-2f07181f78e2",
            title: "Красное",
            price: 5700,
            discount: 0,
            isFavorite: true,
            size: "42-50",
            images: [
                `https://i.ibb.co/0Bq336j/card3.png`,
                `https://i.ibb.co/0Bq336j/card3.png`,
                `https://i.ibb.co/0Bq336j/card3.png`
            ],
            colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
        },
        {
            id: "c2abba86-2aad-40ac-b3a6-e0f6e637bdf6",
            title: "Платок",
            price: 7800,
            discount: 44,
            isFavorite: false,
            size: "45-50",
            images: [
                `https://i.ibb.co/vZPxKHs/card4.png`
            ],
            colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                "#6977F0", "#FFFFFF"],
        },
        {
            id: "88bbba72-2b4e-401d-ba88-1518393c5dc0",
            title: "Вечернее платье",
            price: 1365,
            discount: 0,
            isFavorite: false,
            size: "42-50",
            images: [
                `https://i.ibb.co/2W70kwt/card5.png`,
                `https://i.ibb.co/2W70kwt/card5.png`
            ],
            colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
        },
        {
            id: "72b9c4de-fd30-4f25-bc35-3955c2ba7c98",
            title: "Вечернее платье",
            price: 3700,
            discount: 0,
            isFavorite: false,
            size: "42-50",
            images: [
                `https://i.ibb.co/s5tmjc2/card6.png`
            ],
            colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
        },
        {
            id: "2932d8de-7558-4752-a70b-c14ed10ebe71",
            title: "Вечернее платье",
            price: 4200,
            discount: 40,
            isFavorite: true,
            size: "42-50",
            images: [
                `https://i.ibb.co/4YpZJ8C/card7.png`,
                `https://i.ibb.co/4YpZJ8C/card7.png`,
                `https://i.ibb.co/4YpZJ8C/card7.png`
            ],
            colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
        },
        {
            id: "f626cd4c-37ec-4665-a762-3886e6a62eb4",
            title: "Вечернее платье",
            price: 5440,
            discount: 0,
            isFavorite: false,
            size: "42-50",
            images: [
                `https://i.ibb.co/dcfzGZk/card8.png`,
                `https://i.ibb.co/dcfzGZk/card8.png`,
                `https://i.ibb.co/dcfzGZk/card8.png`,
                `https://i.ibb.co/dcfzGZk/card8.png`
            ],
            colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
        }
    ]
};