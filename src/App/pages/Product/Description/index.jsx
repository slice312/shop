import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {isMobile} from "react-device-detect";

import {productFavoriteToggle} from "src/shared/state/products/actions";
import {basketItemSet} from "src/shared/state/basket/actions";
import {Utils} from "src/shared/utils";

const MobileView = React.lazy(() => import("./MobileView")
    .then(module => ({default: module.MobileView})));

const DesktopView = React.lazy(() => import("./DesktopView")
    .then(module => ({default: module.DesktopView})));


export const Description = ({product}) => {
    const dispatch = useDispatch();
    const basketItems  = useSelector(state => state.basket.items);

    const [selectedColor, setSelectedColor] = React.useState("");
    const [inBasket, setInBasket] = React.useState(false);


    React.useEffect(() => {
        if (product.colors?.length)
            setSelectedColor(product.colors[0]);
    }, [product])


    React.useEffect(() => {
        const isExist = basketItems
            .some(x => x.productId === product.id && x.color === selectedColor);
        setInBasket(isExist);
    }, [selectedColor]);


    const {navigateToBasket} = Utils.Hooks.useProjectNavigation();

    const addToBasketOrRedirect = () => {
        if (inBasket)
            navigateToBasket();
        else {
            dispatch(basketItemSet({
                productId: product.id,
                color: selectedColor,
                qty: 1
            }));
            setInBasket(true);
        }
    };
    
    const onChangeFavorite = () => dispatch(productFavoriteToggle(product.id));

    return (
        <React.Suspense fallback={null}>
            {
                isMobile
                    ? <MobileView
                        product={product}
                        selectedColor={selectedColor}
                        inBasket={inBasket}
                        onChangeColor={color => setSelectedColor(color)}
                        onChangeFavorite={onChangeFavorite}
                        addToBasketOrRedirect={addToBasketOrRedirect}
                    />
                    : <DesktopView
                        product={product}
                        selectedColor={selectedColor}
                        inBasket={inBasket}
                        onChangeColor={color => setSelectedColor(color)}
                        onChangeFavorite={onChangeFavorite}
                        addToBasketOrRedirect={addToBasketOrRedirect}
                    />
            }

        </React.Suspense>
    );
};