import React from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import lo from "lodash";

import {productsSet} from "src/shared/state/products/actions";
import {Api} from "src/shared/utils/api";
import {Description} from "./Description";
import {SimilarProducts} from "./SimilarProducts";
import css from "./styles.module.scss";
import {useBreadcrumbs} from "../../../shared/components/Breadcrumbs";


const PRODUCTS_LIMIT = 5


export const Product = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsState.products);


    React.useEffect(() => {
        (async () => {
            try {
                const productResp = await Api.Products.getProduct(params.id);
                const byCollectionResp = await Api.Products
                    .getProductsByCollection(productResp.data.collectionId, PRODUCTS_LIMIT + 1, 0);
                const arr = [productResp.data, ...byCollectionResp.data.products.filter(x => x.id !== productResp.data.id)];
                dispatch(productsSet(arr));
            } catch (err) {
                console.error("products loading  error", err);
            }
        })();
    }, [params]);


    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [params]);


    const mainProduct = lo.first(products);

    const breadcrumbs = useBreadcrumbs();
    React.useEffect(() => {
        if (mainProduct) {
            (async () => {
                const response = await Api.Collections.getCollection(mainProduct.product.collectionId);
                const data = response.data;
                const collectionsCrumb = {title: "Коллекции", url: "collections"};
                const collectionCrumb = {title: data.title, url: `collections/${data.id}`};
                const productCrumb = {title: mainProduct.product.title, url: `products/${mainProduct.product.id}`};
                breadcrumbs.setCrumbs(collectionsCrumb, collectionCrumb, productCrumb);
            })();
        }
    }, [products]);


    return (
        <div className={css.root}>
            <Description product={mainProduct?.product ?? {}}/>
            <SimilarProducts products={lo.drop(products, 1)}/>
        </div>
    );
};