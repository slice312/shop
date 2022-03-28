import MockAdapter from "axios-mock-adapter";


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

    mockApi.onGet(/bestsellers\?limit=.+&offset=.+/)
        .reply(config => {
            const data = [
                {
                    tittle: "Вечернее платье",
                    price: 2700,
                    discount: 50,
                    isFavorite: true,
                    size: "42-50",
                    imgSrc: `https://i.ibb.co/fGGXMQG/card1.png`,
                    colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                        "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
                },
                {
                    tittle: "Ночное платье",
                    price: 2500,
                    discount: 35,
                    isFavorite: false,
                    size: "42-50",
                    imgSrc: `https://i.ibb.co/fGGXMQG/card2.png`,
                    colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                        "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
                },
                {
                    tittle: "Красное",
                    price: 5700,
                    discount: 0,
                    isFavorite: true,
                    size: "42-50",
                    imgSrc: `https://i.ibb.co/fGGXMQG/card3.png`,
                    colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                        "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
                },
                {
                    tittle: "Платок",
                    price: 7800,
                    discount: 44,
                    isFavorite: false,
                    size: "45-50",
                    imgSrc: `https://i.ibb.co/fGGXMQG/card4.png`,
                    colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
                        "#6977F0", "#FFFFFF"],
                },
            ];

            return [200, data];
        })
};