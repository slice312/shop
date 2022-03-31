/**
 *
 * Пока загрузил картинки сюда https://trio-lyro.imgbb.com
 * вход через trio.bone@gmail.com
 */


const slides = [
    {
        image: `https://i.ibb.co/MpsHH8m/slide1.png`,
        link: `https://trio-lyro.imgbb.com`
    },
    {
        image: `https://i.ibb.co/MpsHH8m/slide1.png`,
        link: null
    },
    {
        image: `https://i.ibb.co/MpsHH8m/slide1.png`,
        link: null
    },
];


const collections = [
    {
        id: "7c2e5296-9591-4966-a142-3127c6dd64c6",
        title: "Повседневная одежда",
        image: `https://i.ibb.co/gSxBcST/collection1.png`
    },
    {
        id: "340b401f-b19e-4326-9501-55e0494b10e8",
        title: "Одежда на пляж",
        image: `https://i.ibb.co/DDdt7JJ/collection2.png`
    },
    {
        id: "ab33cb91-5840-4c85-bacc-fa3585e0a2e7",
        title: "Юбки",
        image: `https://i.ibb.co/wcFsrZh/collection3.png`
    },
    {
        id: "95860924-6788-4d9a-bf54-7bb4c601ff57",
        title: "Джинсы",
        image: `https://i.ibb.co/6szJ1xH/collection4.png`
    },
    {
        id: "414a7f58-1ef5-4b1b-9785-876cb05e1809",
        title: "Коллекция лето 2020",
        image: `https://i.ibb.co/TW3ZJwx/collection5.png`
    },
    {
        id: "5de74e7b-0149-4345-b53f-fbdccef0e9a0",
        title: "Коллекция осень 2020",
        image: `https://i.ibb.co/6szJ1xH/collection4.png`
    },
    {
        id: "b405f6cc-310f-4e66-a11c-79091bb84181",
        title: "Коллекция зима 2020",
        image: `https://i.ibb.co/TW3ZJwx/collection5.png`
    },
    {
        id: "9774232c-609f-4a1a-ad13-5354d7755bdd",
        title: "Коллекция весна 2020",
        image: `https://i.ibb.co/gSxBcST/collection1.png`
    },
    {
        id: "2481a5d8-a603-4a02-8f7b-0016ef1a2ae5",
        title: "Платья",
        image: `https://i.ibb.co/6mGq1p7/collection6.png`
    },
    {
        id: "3f25ef76-77a8-4bb6-9ae1-a54ae8cc15e8",
        title: "Для выезда на природу",
        image: `https://i.ibb.co/DDdt7JJ/collection2.png`
    },
];


const cards = [
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
];



export const DB = {
    slides,
    cards,
    collections
};