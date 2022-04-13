import React from "react";
import {useParams} from "react-router-dom";
import {Api} from "src/shared/utils/api";
import lo from "lodash";
import css from "./styles.module.scss";
import {CardsView} from "src/shared/components/CardsView";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";
import {PaginationControl} from "src/shared/components/PaginationControl";
import {productsReset, productsSet, setProductsByCollection} from "src/shared/state/products/actions";
import {useDispatch, useSelector} from "react-redux";
import {Novelties} from "./Novelties";


const PRODUCTS_BATCH_SIZE = 12;

export const Collection = () => {
    const dispatch = useDispatch();
    const products = lo.take(useSelector(state => state.productsState.products), PRODUCTS_BATCH_SIZE);
    const params = useParams();
    const [pageIndex, setPageIndex] = React.useState(0);
    const [totalProductsQty, setTotalProductsQty] = React.useState(0);


    React.useEffect(() => {
        dispatch(setProductsByCollection(params.id, PRODUCTS_BATCH_SIZE, 0,
            response => setTotalProductsQty(response.data.totalQty)));
    }, [params]);


    React.useEffect(() => {
        dispatch(productsReset());
    }, []);


    return (
        <div className={css.root}>
            <div className={css.title}>
                Коллекции
            </div>
            <CardsView cards={products} CardElement={ProductCardWrapper}/>
            <div className={css.paginator}>
                <PaginationControl
                    pageSize={PRODUCTS_BATCH_SIZE}
                    totalItemsQty={totalProductsQty}
                    activePageIndex={pageIndex}
                    onActivePageChanged={i => setPageIndex(i)}
                />
            </div>
            <Novelties/>
        </div>
    );
};