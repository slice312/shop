import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    loadProductsFromBasket,
    basketItemRemoved,
    basketItemSet
} from "src/shared/state/basket/actions";
import {calculateBasket} from "src/shared/state/order/actions";
import {BasketItemView} from "./BasketItemView";
import css from "./styles.module.scss";


export const ProductsContainer = () => {
    const dispatch = useDispatch();
    const basketItems = useSelector(state => state.basket.items);
    const productsInfo = useSelector(state => state.productsState.products);

    React.useEffect(() => {
        dispatch(loadProductsFromBasket());
    }, [basketItems]);

    React.useEffect(() => {
        dispatch(calculateBasket());
    }, [productsInfo, basketItems]);




    const onDeleteClick = (basketItem) => {
        dispatch(basketItemRemoved(basketItem));
    };

    const onPlusClick = (basketItem) => {
        dispatch(basketItemSet({
            ...basketItem,
            qty: basketItem.qty + 1
        }));
    };

    const onMinusClick = (basketItem) => {
        const qty = basketItem.qty - 1;
        if (qty <= 0)
            dispatch(basketItemRemoved(basketItem));
        else {
            dispatch(basketItemSet({
                ...basketItem,
                qty
            }));
        }
    };

    return (
        <div className={css.root}>
            {
                basketItems.map((basketItem, i) => {
                    const info = productsInfo.find(x => x.product.id === basketItem.productId)
                    if (!info)
                        return null;
                    return (
                        <BasketItemView
                            key={i}
                            basketItem={basketItem}
                            title={info.product.title}
                            image={info.product.images?.[0]}
                            size={info.product.size}
                            price={info.product.price}
                            discount={info.product.discount}
                            onDeleteClick={onDeleteClick}
                            onPlusClick={onPlusClick}
                            onMinusClick={onMinusClick}
                        />
                    );
                })
            }
        </div>
    );
};