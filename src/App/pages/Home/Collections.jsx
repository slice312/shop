import React from "react";
import {useSelector, useDispatch} from "react-redux";

import {pushCollections, loadCollections} from "src/shared/state/collections/actions";
import {CollectionCard} from "src/shared/components/CollectionCard";
import {CardsContainer} from "./CardsContainer";


const START_PAGE_SIZE = 4;
const NEXT_PAGE_SIZE = 8;


export const Collections = () => {
    const dispatch = useDispatch();
    const {collections, collectionsIsFetching} = useSelector(state => state.collectionsState);

    React.useEffect(() => {
        dispatch(loadCollections(START_PAGE_SIZE));
    }, [dispatch]);


    const loadMore = () => {
        if (!collectionsIsFetching)
            dispatch(pushCollections(NEXT_PAGE_SIZE));
    };


    return (
        <CardsContainer
            title="Коллекции"
            cards={collections}
            onButtonLoadClick={loadMore}
            CardElement={CollectionCard}
        />
    );
};