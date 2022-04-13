import React from "react";
import {Utils} from "src/shared/utils";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import css from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {productsSet} from "src/shared/state/products/actions";


const RANDOM_PRODUCT_LIMIT = 5;

export const EmptyResult = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsState.products);

    React.useEffect(() => {
        (async () => {
            const products = await Utils.Data.getRandomProducts(RANDOM_PRODUCT_LIMIT);
            dispatch(productsSet(products));
        })();
    }, [])

    return (
        <div className={css.root}>
            <div className={css.emptyResultText}>
                По Вашему запросу ничего не найдено.
            </div>
            <div className={css.mayBeOffer}>
                Возможно Вас заинтересует
            </div>
            <div className={css.cardContainer}>
                {
                    products.map((x, i) => <ProductCardWrapper key={i} product={x.product}/>)
                }
            </div>
        </div>
    );
};