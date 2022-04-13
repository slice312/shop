import css from "./styles.module.scss";
import {AdaptiveCardsView} from "../../shared/components/AdaptiveCardsView";
import {ProductCardWrapper} from "../../shared/components/ProductCardWrapper";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {productsReducer} from "../../shared/state/products/reducer";
import {Api} from "src/shared/utils/api";
import lo from "lodash";
import {productsSet} from "../../shared/state/products/actions";


const PRODUCT_LIMIT = 12;

export const Favorites = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsState.products);
    const [totalFavoritesQty, setTotalFavoritesQty] = React.useState(0);

    React.useEffect(() => {
        (async () => {
            try {
                const response = await Api.getFavoriteProducts(PRODUCT_LIMIT, 0);
                if (response.status === 200) {
                    dispatch(productsSet(response.data.products));
                    setTotalFavoritesQty(response.data.totalQty)
                    console.log("getFavoriteProducts success", response.data);
                } else
                    console.log("getFavoriteProducts error", response.status);
            } catch (err) {
                console.error("getFavoriteProducts error", err);
            }
        })();
    }, [])

    return (
        <div className={css.root}>
            <div className={css.title}>
                Избранное
            </div>
            <div className={css.qtyLabel}>
                Товаров в избарнном: {totalFavoritesQty}
            </div>
            <AdaptiveCardsView className={css.cardsView}
                               cards={products}
                               CardElement={ProductCardWrapper}
            />
        </div>
    );
};