import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushCollections, collectionsReset} from "src/shared/state/collections/actions";
import {CollectionCard} from "src/shared/components/CollectionCard";
import {CardsContainer} from "./CardsContainer";


const START_COLLECTION_BATCH_SIZE = 4;
const NEXT_COLLECTION_BATCH_SIZE = 8;


export const Collections = () => {
    const collectionCards = useSelector(state => state.collections.collections);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!collectionCards?.length)
            dispatch(pushCollections(START_COLLECTION_BATCH_SIZE));

        return () => void dispatch(collectionsReset());
    }, [dispatch]);


    const loadMoreClick = () => {
        dispatch(pushCollections(NEXT_COLLECTION_BATCH_SIZE));
    };


    return (
        <CardsContainer
            title="Коллекции"
            cards={collectionCards}
            onButtonLoadClick={loadMoreClick}
            CardElement={CollectionCard}
        />
    );
};