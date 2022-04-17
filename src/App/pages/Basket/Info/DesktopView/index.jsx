import React from "react";
import {BasketInfoPropType} from "src/shared/constants/propTypes";
import css from "./styles.module.scss";
import {ModalOrder} from "src/shared/components/modals/ModalOrder";
import PropTypes from "prop-types";


const propTypes = {
    info :BasketInfoPropType.isRequired,
    onCreateOrder: PropTypes.func.isRequired
};

export const DesktopView = ({info, onCreateOrder}) => {
    const amountWithDiscount = info.amount - info.discountAmount;

    return (
        <div className={css.root}>
            <div className={css.title}>
                Сумма заказа
            </div>
            <div className={css.info}>
                <div className={css.labels}>
                    <span>Количество линеек:</span>
                    <span>Количество товаров:</span>
                    <span>Стоимость:</span>
                    <span>Скидка:</span>
                </div>
                <div className={css.values}>
                    <span>{info.productsModelQty} шт</span>
                    <span>{info.productsQty} шт</span>
                    <span>{info.amount} сом</span>
                    <span>{info.discountAmount} сом</span>
                </div>
            </div>
            <div className={css.lineDiv}>
                <hr className={css.line}/>
            </div>
            <div className={css.info}>
                <div className={css.labels}>
                    <span>Итого к оплате:</span>
                </div>
                <div className={css.values}>
                    <span>{amountWithDiscount} сом</span>
                </div>
            </div>

            <div className={css.buttonDiv}>
                <button type="button" onClick={onCreateOrder}>
                    Оформить заказ
                </button>
            </div>
        </div>
    );
};

DesktopView.propTypes = propTypes;