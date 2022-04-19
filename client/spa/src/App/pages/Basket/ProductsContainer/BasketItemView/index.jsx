import React from "react"
import PropTypes from "prop-types";
import css from "./styles.module.scss";

import xmarkIcon from "src/assets/icons/x-mark.svg";
import minusIcon from "src/assets/icons/minus.svg";
import plusIcon from "src/assets/icons/plus.svg";


const propTypes = {
    basketItem: PropTypes.shape({
        productId: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        qty: PropTypes.number.isRequired,
    }),
    title: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    onDeleteClick: PropTypes.func.isRequired,
    onPlusClick: PropTypes.func.isRequired,
    onMinusClick: PropTypes.func.isRequired,
};

export const BasketItemView = (
    {
        basketItem,
        title,
        image,
        size,
        price,
        discount,
        onDeleteClick,
        onPlusClick,
        onMinusClick
    }) => {

    const priceWithDiscount = Math.round(price - price * discount / 100);


    return (
        <div className={css.root}>
            <div>
                <img src={image} alt={image}/>
            </div>
            <div className={css.buttonClose}
                 onClick={() => onDeleteClick(basketItem)}
            >
                <img src={xmarkIcon} alt={xmarkIcon}/>
            </div>

            <div className={css.description}>
                <div className={css.title}>
                    {title}
                </div>
                <div className={css.size}>
                    <span>Размер:</span>
                    <span className={css.sizeValue}>{size}</span>
                </div>
                <div className={css.color}>
                    <div>Цвет:</div>
                    <div className={css.colorValueWrap}>
                        <div className={css.colorValue} style={{backgroundColor: basketItem.color}}/>
                    </div>
                </div>
                <div className={css.price}>
                    <span className={css.priceWithDiscount}>{priceWithDiscount}</span>
                    <span className={css.oldPrice}>{price}</span>
                </div>

                <div className={css.qtyButtons}>
                    <div className={css.button}
                         onClick={() => onMinusClick(basketItem)}
                    >
                        <img className={css.minusIcon} src={minusIcon} alt={minusIcon}/>
                    </div>
                    <div className={css.qtyLabel}>
                        {basketItem.qty}
                    </div>
                    <div className={css.button}
                         onClick={() => onPlusClick(basketItem)}
                    >
                        <img className={css.plusIcon} src={plusIcon} alt={plusIcon}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

BasketItemView.propTypes = propTypes;