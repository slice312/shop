import React from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import lo from "lodash";
import {Api} from "src/shared/utils/api";
import {productFavoriteToggle, productsSet} from "src/shared/state/products/actions";
import {Description} from "./Description";
import {SimilarProducts} from "./SimilarProducts";
import css from "./styles.module.scss";


const PRODUCTS_LIMIT = 5

// TODO: тут надо отдельно сделать компонент для мобилки

export const Product = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsState.products);


    React.useEffect(() => {
        (async () => {
            try {
                const productResp = await Api.getProduct(params.id);
                const byCollectionResp = await Api
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

    return (
        <div className={css.root}>
            <Description product={mainProduct?.product ?? {}}
                         onChangedFavorite={() => dispatch(productFavoriteToggle(mainProduct.product.id))}
            />
            <SimilarProducts products={lo.drop(products, 1)}/>
        </div>
    );
};