import React from "react";
import {useLocation} from "react-router-dom";
import {Api} from "src/shared/utils/api";
import css from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {productsReset, productsSet} from "src/shared/state/products/actions";
import {CardsView} from "src/shared/components/CardsView";
import {ProductCardWrapper} from "src/shared/components/ProductCardWrapper";


export const SearchResult = () => {
    const {state} = useLocation();
    const dispatch = useDispatch();

    const products = useSelector(state => state.productsState.products);


    React.useEffect(() => {
        (async () => {
            dispatch(productsReset());

            if (!state.searchResult)
                return;
            try {
                const ids = state.searchResult.matches.map(x => x.id);
                const response = await Api.getProductsByIds(ids);
                if (response.status === 200) {
                    dispatch(productsSet(response.data));
                    console.log("getProductsByIds success", response.data);
                } else
                    console.log("getProductsByIds error", response.status);
            } catch (err) {
                console.error("getProductsByIds error", err);
            }
        })();
    }, [state]);

    // debugger
    return (
        <div className={css.root}>
            <CardsView cards={products} CardElement={ProductCardWrapper}/>
            {/*<PaginationControl/>*/}
        </div>
    )
};