import React from "react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isMobile} from "react-device-detect";
import lo from "lodash";

import {productsSet} from "src/shared/state/products/actions";
import {Api} from "src/shared/utils/api";
import {PaginationControl} from "src/shared/components/PaginationControl";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {AdaptiveCardsView} from "src/shared/components/AdaptiveCardsView";
import {EmptyResult} from "./EmptyResult";
import css from "./styles.module.scss";


const PAGE_SIZE = (isMobile) ? 4 : 12;


export const SearchResult = () => {
    const {state: {query, result}} = useLocation();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsState.products);
    const [pageIndex, setPageIndex] = React.useState(0);


    const fetchProducts = async () => {
        if (!result?.matches?.length)
            return;
        try {
            const ids = lo.chain(result.matches)
                .drop(pageIndex * PAGE_SIZE)
                .take(PAGE_SIZE)
                .map(x => x.id);

            const response = await Api.Products.getProductsByIds(ids);
            if (response.status === 200) {
                dispatch(productsSet(response.data));
                console.log("getProductsByIds success", response.data);
            } else
                console.error("getProductsByIds", response.status);
        } catch (err) {
            console.error("getProductsByIds", err);
        }
    };

    React.useEffect(() => {
        // При повторном поиске надо сбросить пагинатор, и заново загрузить товары, даже если
        // pageIndex не изменился.
        setPageIndex(prev => {
            if (prev === 0)
                void fetchProducts();
            return 0;
        });
    }, [query, result]);

    React.useEffect(() => {
        void fetchProducts();
    }, [pageIndex]);


    return (
        <div className={css.root}>
            <div className={css.query}>
                <div>Результаты поиска по запросу:</div>
                <div>{query}</div>
            </div>
            {
                (result?.matches?.length)
                    ? (
                        <React.Fragment>
                            <AdaptiveCardsView className={css.cardsContainer}
                                               cards={products}
                                               CardElement={ProductCardWrapper}
                            />
                            <PaginationControl
                                className={css.paginator}
                                pageSize={PAGE_SIZE}
                                totalItemsQty={result.count}
                                activePageIndex={pageIndex}
                                onActivePageChanged={i => setPageIndex(i)}
                            />
                        </React.Fragment>
                    )
                    : <EmptyResult/>
            }
        </div>
    );
};