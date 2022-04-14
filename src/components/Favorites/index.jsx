import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {isMobile} from "react-device-detect";
import InfiniteScroll from "react-infinite-scroller";
import {
    setFavoriteProducts,
    pushFavoriteProducts,
    setRandomProducts
} from "src/shared/state/products/actions";
import {AdaptiveCardsView} from "src/shared/components/AdaptiveCardsView";
import {MobileSlideCardsView} from "src/shared/components/MobileSlideCardsView";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import css from "./styles.module.scss";


const PAGE_SIZE = (isMobile) ? 4 : 12;
const RANDOM_PRODUCT_LIMIT = 5;


export const Favorites = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsState.products);
    const totalQtyOnServer = useSelector(state => state.productsState.totalQtyOnServer);
    const productsIsFetching = useSelector(state => state.productsState.productsIsFetching);

    React.useEffect(() => {
        const responseCallback = response => {
            if (!response.data.totalQty)
                dispatch(setRandomProducts(RANDOM_PRODUCT_LIMIT));
        };

        dispatch(setFavoriteProducts(PAGE_SIZE, 0, responseCallback));
    }, []);


    const loadMore = () => {
        if (products.length < totalQtyOnServer && !productsIsFetching)
            dispatch(pushFavoriteProducts(PAGE_SIZE));
    };


    return (
        <div className={css.root}>
            <div className={css.title}>
                Избранное
            </div>
            <div className={css.qtyLabel}>
                Товаров в избарнном: {totalQtyOnServer}
            </div>
            {
                (totalQtyOnServer)
                    ? <InfiniteScrollContainer products={products} onLoad={loadMore}/>
                    : <RandomProductCardsView products={products}/>
            }
        </div>
    );
};


export const InfiniteScrollContainer = ({products, onLoad}) => {
    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={onLoad}
            hasMore={true}
            loader={null}
        >
            <AdaptiveCardsView className={css.cardsView}
                               cards={products}
                               CardElement={ProductCardWrapper}
            />
        </InfiniteScroll>
    );
};


export const RandomProductCardsView = ({products}) => {
    return (
        <React.Fragment>
            <div className={css.mayBeOffer}>
                Возможно Вас заинтересует
            </div>
            {
                isMobile
                    ? (<MobileSlideCardsView products={products}
                                             CardElement={ProductCardWrapper}
                                             chunkSize={5}
                        />
                    )
                    : (
                        <div className={css.randomCardsContainer}>
                            {
                                products.map((x, i) => <ProductCardWrapper key={i} product={x.product}/>)
                            }
                        </div>
                    )
            }
        </React.Fragment>
    );
};