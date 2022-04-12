import React from "react";
import {useLocation} from "react-router-dom";
import {Api} from "src/shared/utils/api";
import css from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {productsReset, productsSet} from "src/shared/state/products/actions";
import {CardsView} from "src/shared/components/CardsView";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {PaginationControl} from "../../shared/components/PaginationControl";
import {DesktopView} from "./View";
import {isMobile} from "react-device-detect";


const PAGE_SIZE = (isMobile) ? 4 : 12;


export const SearchResult = () => {
    const {state: {query, result}} = useLocation();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsState.products);
    const [pageIndex, setPageIndex] = React.useState(0);


    React.useEffect(() => {
        (async () => {
            dispatch(productsReset());
            if (!result)
                return;

            try {
                const ids = result.matches.map(x => x.id);
                const response = await Api.getProductsByIds(ids, PAGE_SIZE, 0);
                if (response.status === 200) {
                    dispatch(productsSet(response.data));
                    console.log("getProductsByIds success", response.data);
                } else
                    console.log("getProductsByIds error", response.status);
            } catch (err) {
                console.error("getProductsByIds error", err);
            }
        })();
    }, [query, result]);


    return (
        <div className={css.root}>
            <div className={css.title}>
                {/*Результаты поиска по запросу: {query}*/}
            </div>
            <DesktopView cards={products} CardElement={ProductCardWrapper}/>
            {/*<PaginationControl*/}
            {/*    pageSize={PAGE_SIZE}*/}
            {/*    totalItemsQty={result.count}*/}
            {/*    activeItemIndex={pageIndex}*/}
            {/*    onActiveItemChanged={i => setPageIndex(i)}*/}
            {/*/>*/}
            {/*<PaginationControl/>*/}
        </div>
    )
};