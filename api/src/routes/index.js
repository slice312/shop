import express from "express";
import {Common} from "src/contollers/common";
import {Collections} from "src/contollers/collections";
import {Products} from "src/contollers/products";
import {Service} from "src/contollers/service";


const router = express.Router();

// TODO: порядок роутов не менять, а то все полетит, апи надо по нормальному переписать
router.get("/home/ad-slides", Common.homeAdSlideImages);
router.get("/news", Common.news);
router.get("/common-site-info", Common.commonSiteInfo);
router.get("/about-info", Common.aboutInfo);
router.get("/advantages", Common.usAdvantages);
router.get("/faq", Common.faq);
router.get("/public-offer", Common.publicOffer);

router.get("/collections/:collection_id", Collections.collection);
router.get("/collections", Collections.collections);

router.get("/products/favorites", Products.favoriteProducts);
router.get("/products/bestsellers", Products.bestsellers);
router.get("/products/novelties", Products.novelties);
router.get("/products/:product_id", Products.product);
router.get("/products", Products.productsByName);
router.get("/products/collection/:collection_id", Products.productsByCollection);

router.post("/products/get", Products.productsByIds);
router.put("/products/:product_id", Products.setProductFavoriteFlag);

router.put("/callback", Service.requestCallback);
router.post("/order", Service.orderInfo);


export const DataRouter = router;