import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadCollections} from "src/shared/state/collections/actions";
import {PaginationControl} from "src/shared/components/PaginationControl";
import {CardsView} from "src/shared/components/CardsView";
import {CollectionCard} from "src/shared/components/CollectionCard";
import css from "./styles.module.scss";


const COLLECTION_BATCH_SIZE = 8;
const PAGE_SIZE = 4;


export const Collections = () => {
    const dispatch = useDispatch();
    const {collections, totalQty} = useSelector(state => state.collections);
    const [pageIndex, setPageIndex] = React.useState(0);

    React.useEffect(() => {
        dispatch(loadCollections(COLLECTION_BATCH_SIZE, pageIndex * COLLECTION_BATCH_SIZE));
    }, [dispatch, pageIndex]);

    const totalItemsQty = Math.ceil(totalQty / COLLECTION_BATCH_SIZE)

    return (
        <div className={css.root}>
            <div className={css.title}>
                Коллекции
            </div>
            <CardsView cards={collections} CardElement={CollectionCard}/>
            <div className={css.paginator}>
                <PaginationControl
                    pageSize={PAGE_SIZE}
                    totalItemsQty={totalItemsQty}
                    activeItemIndex={pageIndex}
                    onActiveItemChanged={i => setPageIndex(i)}
                />
            </div>
        </div>
    );
};