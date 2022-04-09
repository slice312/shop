import React from "react";
import css from "./styles.module.scss";
import xmarkIcon from "src/assets/icons/x-mark.svg";
import minusIcon from "src/assets/icons/minus.svg";
import plusIcon from "src/assets/icons/plus.svg";


export const BasketItem = ({image, title, size, price, discount, color}) => {
    const priceWithDiscount = Math.round(price - price * discount / 100);

    return (
        <div className={css.item}>
            <div>
                <img src={image} alt={image}/>
            </div>
            <div className={css.buttonClose}>
                <img src={xmarkIcon} alt="xmarkIcon"/>
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
                        <div className={css.colorValue} style={{backgroundColor: color}}/>
                    </div>
                </div>
                <div className={css.price}>
                    <span className={css.priceWithDiscount}>{priceWithDiscount}</span>
                    <span className={css.oldPrice}>{price}</span>
                </div>

                <div className={css.qtyButtons}>
                    <div className={css.button}>
                        <img className={css.minusIcon} src={minusIcon} alt={minusIcon}/>
                    </div>
                    <div className={css.qtyLabel}>
                        1
                    </div>
                    <div className={css.button}>
                        <img className={css.plusIcon} src={plusIcon} alt={plusIcon}/>
                    </div>
                </div>
            </div>
        </div>
    );
};