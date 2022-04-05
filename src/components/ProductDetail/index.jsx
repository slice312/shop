import React from "react";
import {useParams} from "react-router-dom";
import cn from "classnames";
import css from "./styles.module.scss";
import shoppingBagIcon from "src/assets/icons/shopping-bag-white.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart-white.svg";
import filledHeartIcon from "src/assets/icons/filled-heart-white.svg";
import array from "lodash/array";
import {Api} from "src/shared/utils/api";
import {SimilarProducts} from "./SimilarProducts";


export const ProductDetail = () => {
    const [product, setProduct] = React.useState({}); // TODO: решить проблему с undefined в тегах
    const params = useParams();

    console.log("ProductDetail");

    React.useEffect( () => {
        (async () => {
            try {
                const response = await Api.getProduct(params.id);
                if (response.status === 200) {
                    console.log("getProduct success");
                    setProduct(response.data);
                } else {
                    console.error("getProduct error", response.status);
                }
            } catch (err) {
                console.error("getProduct error", err);
            }
        })();
    }, [params]);

    const priceWithDiscount = Math.round(product.price - product.price * product.discount / 100);


    return (
        <div className={css.root}>
            <div className={css.product}>
                <div className={css.column1}>
                    {
                        product.images?.map((x, i) =>
                            <img key={i} src={x} alt={x}/>)
                    }
                </div>
                <div className={css.column2}>
                    <div className={css.title}>
                        {product.title}
                    </div>
                    <div className={css.vendor}>
                        <span className={css.vendorLabel}>Артикул:</span>
                        <span className={css.vendorValue}>{product.vendorCode}</span>
                    </div>
                    <div className={css.color}>
                        {/*TODO: сделать кнопки кликабельными и выделять активные*/}
                        <span className={css.colorLabel}>Цвет:</span>
                        <span className={css.colorButtons}>
                        {
                            product.colors?.map((x, i) =>
                                <button key={i} type="button" style={{backgroundColor: x}}/>
                            )
                        }
                    </span>
                    </div>
                    <div className={css.price}>
                        <span>{priceWithDiscount}</span>
                        <span className={css.oldPrice}>{product.price} с</span>
                    </div>
                    <div className={css.description}>
                        <div className={css.title}>О товаре:</div>
                        <div className={css.text}>{product.description}</div>
                    </div>
                    <div className={css.props}>
                        <div>
                            <div>
                                <span className={css.propsLabel}>Размерный ряд:</span>
                                <span className={css.propsValue}>{product.size}</span>
                            </div>
                            <div>
                                <span className={css.propsLabel}>Количество в линейке:</span>
                                <span className={css.propsValue}>{product.size}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className={css.propsLabel}>Состав ткани:</span>
                                <span className={css.propsValue}>{product.size}</span>
                            </div>
                            <div>
                                <span className={css.propsLabel}>Материал:</span>
                                <span className={css.propsValue}>{product.size}</span>
                            </div>
                        </div>
                    </div>
                    <div className={css.buttons}>
                        <div className={cn(css.buttonShoppingBag, css.buttonHovered)}>
                            <img src={shoppingBagIcon} alt="shoppingBagIcon"/>
                            <span>Добавить в корзину</span>
                        </div>
                        <div className={cn(css.buttonFavorite, css.buttonHovered)}>
                            <img src={emptyHeartIcon} alt="emptyHeartIcon"/>
                        </div>
                    </div>
                </div>
            </div>
            <SimilarProducts collectionId={product.collectionId}/>
        </div>
    );
};