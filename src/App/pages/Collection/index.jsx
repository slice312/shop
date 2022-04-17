import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {isMobile} from "react-device-detect";
import lo from "lodash";

import {loadProductsByCollection} from "src/shared/state/products/actions";
import {Api} from "src/shared/utils/api";
import {AdaptiveCardsView} from "src/shared/components/AdaptiveCardsView";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {PaginationControl} from "src/shared/components/PaginationControl";
import {Novelties} from "./Novelties";
import css from "./styles.module.scss";


const PAGE_SIZE = (isMobile) ? 4 : 12;


export const Collection = () => {
    const {id: collectionId} = useParams();
    const dispatch = useDispatch();

    const {products, totalQtyOnServer} = useSelector(state => state.productsState);
    const [collection, setCollection] = React.useState({});
    const [pageIndex, setPageIndex] = React.useState(0);


    React.useEffect(() => {
        (async () => {
                try {
                    const response = await Api.Collections.getCollection(collectionId);
                    setCollection(response.data);
                } catch (err) {
                    console.error(err);
                }
        })();
    }, []);

    React.useEffect(() => {
        dispatch(loadProductsByCollection(collectionId, PAGE_SIZE, pageIndex * PAGE_SIZE));
    }, [dispatch, pageIndex]);

    const productsByCollection = products.filter(x => x.product.collectionId === collectionId);


    return (
        <div className={css.root}>
            <div className={css.title}>
                Коллекция {collection.title}
            </div>
            <AdaptiveCardsView className={css.cardsContainer}
                               cards={lo.take(productsByCollection, totalQtyOnServer - pageIndex * PAGE_SIZE)}
                               CardElement={ProductCardWrapper}
            />
            <PaginationControl
                className={css.paginator}
                pageSize={PAGE_SIZE}
                totalItemsQty={totalQtyOnServer}
                activePageIndex={pageIndex}
                onActivePageChanged={i => setPageIndex(i)}
            />
            <Novelties/>
        </div>
    );
};