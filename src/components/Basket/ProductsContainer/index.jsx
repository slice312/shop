import React from "react";
import {BasketItemView} from "./BasketItemView";
import css from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {loadProductsFromBasket, basketItemRemoved, basketItemSet} from "src/shared/state/basket/actions";


export const ProductsContainer = () => {
    const dispatch = useDispatch();
    const basketItems = useSelector(state => state.basket.items);
    const products = useSelector(state => state.productsState.products);

    React.useEffect(() => {
        dispatch(loadProductsFromBasket());
    }, []);

    const productsInfo = React.useMemo(() => {
        const map = new Map();
        for (const p of products)
            map.set(p.product.id, p.product);
        return map
    }, [products]);


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
                    const info = productsInfo.get(basketItem.productId)
                    if (!info)
                        return null;
                    return (
                        <BasketItemView
                            key={i}
                            basketItem={basketItem}
                            title={info.title}
                            image={info.images?.[0]}
                            size={info.size}
                            price={info.price}
                            discount={info.discount}
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