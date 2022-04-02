import React from "react";
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";

import {collectionsReset, pushCollections} from "src/shared/state/collections/actions";
import {CardsView} from "src/shared/components/CardsView";
import {CollectionCard} from "src/shared/components/CollectionCard";
import css from "./styles.module.scss";
import arrowLeftIcon from "src/assets/icons/arrow-left-black.svg";
import arrowRightIcon from "src/assets/icons/arrow-right-black.svg";

import lodash from "lodash";

const COLLECTION_BATCH_SIZE = 8;

export const Collections = () => {
    const {collections, totalQty} = useSelector(state => state.collections);
    const [pageNum, setPageNum] = React.useState(0);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(collectionsReset());
        dispatch(pushCollections(COLLECTION_BATCH_SIZE));
    }, [dispatch, pageNum]);


    const nextPageClick = () => {
        setPageNum(prev => prev + 1);

    };
    const prevPageClick = () => {
        setPageNum(prev => prev -1);

    };

    const pageCount = 6//Math.ceil(totalQty / COLLECTION_BATCH_SIZE);
    let pageSelectorElements = [];


    pageSelectorElements.push(
        <div className={css.item} onClick={prevPageClick}>
            <img src={arrowLeftIcon} alt="arrowLeftIcon"/>
        </div>
    );

    //pageNum = 5
    const elements = lodash.take(lodash.range(pageCount), 4)
        .map((_, i) => {
            const num = i;
            return (
                <div key={num}
                     className={cn(css.item, (num === pageNum) ? css.active : null)}
                     onClick={() => setPageNum(num)}
                >
                    {num + 1}
                </div>
            );
        });

    pageSelectorElements.push(...elements);


    if (pageCount > 5) {
        pageSelectorElements.push(
            <div className={cn(css.item, css.dots)}>
                ...
            </div>
        );
    }

    pageSelectorElements.push(
        <div className={css.item} onClick={() => setPageNum(pageCount - 1)}>
            {pageCount}
        </div>
        ,
        <div className={css.item} onClick={nextPageClick}>
            <img src={arrowRightIcon} alt="arrowRightIcon"/>
        </div>
    );



    return (
        <div className={css.root}>
            <div className={css.title}>
                Коллекции
            </div>

            <CardsView cards={collections} CardElement={CollectionCard}/>

            <div className={css.pagesContainer}>
                {
                    pageSelectorElements
                }
                {/*<div className={css.item}>*/}
                {/*    <img src={arrowRightIcon} alt="arrowRightIcon"/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};