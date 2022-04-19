import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {isMobile} from "react-device-detect";

import {setRandomProducts} from "src/shared/state/products/actions";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import css from "./styles.module.scss";

const MobileSlideCardsView = React.lazy(() => import("src/shared/components/MobileSlideCardsView")
    .then(module => ({default: module.MobileSlideCardsView})));


const RANDOM_PRODUCT_LIMIT = 5;


export const EmptyResult = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsState.products);

    React.useEffect(() => {
        dispatch(setRandomProducts(RANDOM_PRODUCT_LIMIT));
    }, []);


    return (
        <React.Suspense fallback={null}>
            <div className={css.root}>
                <div className={css.emptyResultText}>
                    По Вашему запросу ничего не найдено.
                </div>
                <div className={css.mayBeOffer}>
                    Возможно Вас заинтересует
                </div>
                {
                    isMobile
                        ? (<MobileSlideCardsView
                                className={css.mobileCardContainer}
                                products={products}
                                CardElement={ProductCardWrapper}
                                chunkSize={5}
                            />
                        )
                        : (
                            <div className={css.cardContainer}>
                                {
                                    products.map((x, i) => <ProductCardWrapper key={i} product={x.product}/>)
                                }
                            </div>
                        )
                }
            </div>
        </React.Suspense>
    );
};