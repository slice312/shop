import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {isMobile} from "react-device-detect";

import {loadCollections} from "src/shared/state/collections/actions";
import {AdaptiveCardsView} from "src/shared/components/AdaptiveCardsView";
import {CollectionCard} from "src/shared/components/CollectionCard";
import {PaginationControl} from "src/shared/components/PaginationControl";
import css from "./styles.module.scss";


const PAGE_SIZE = (isMobile) ? 4 : 8;


export const Collections = () => {
    const dispatch = useDispatch();
    const {collections, totalQtyOnServer} = useSelector(state => state.collectionsState);
    const [pageIndex, setPageIndex] = React.useState(0);

    React.useEffect(() => {
        dispatch(loadCollections(PAGE_SIZE, pageIndex * PAGE_SIZE));
    }, [dispatch, pageIndex]);


    return (
        <div className={css.root}>
            <div className={css.title}>
                Коллекции
            </div>
            <AdaptiveCardsView className={css.cardsContainer}
                               cards={collections}
                               CardElement={CollectionCard}
            />
            <PaginationControl
                className={css.paginator}
                pageSize={PAGE_SIZE}
                totalItemsQty={totalQtyOnServer}
                activePageIndex={pageIndex}
                onActivePageChanged={i => setPageIndex(i)}
            />
        </div>
    );
};