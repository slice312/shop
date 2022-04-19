import React from "react";
import {isMobile} from "react-device-detect";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import css from "./styles.module.scss";

const MobileSlideCardsView = React.lazy(() => import("src/shared/components/MobileSlideCardsView")
    .then(module => ({default: module.MobileSlideCardsView})));


export const SimilarProducts = ({products}) => {
    return (
        <React.Suspense fallback={null}>
            <div className={css.root}>
                <div className={css.title}>
                    Похожие товары
                </div>
                {
                    isMobile
                        ? (<MobileSlideCardsView className={css.mobileCardContainer}
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