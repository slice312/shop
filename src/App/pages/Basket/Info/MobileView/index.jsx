import React from "react";
import {BasketInfoPropType} from "src/shared/constants/propTypes";
import {ModalOrder} from "src/shared/components/modals/ModalOrder";
import css from "./styles.module.scss";
import PropTypes from "prop-types";


export const MobileView = ({info, onCreateOrder}) => {
    const [isShowAdditionalInfo, setIsShowAdditionalInfo] = React.useState(false);

    const toggleAdditionalPanel = () => setIsShowAdditionalInfo(prev => !prev);

    return (
        <React.Fragment>
            {isShowAdditionalInfo ? <AdditionalPanel info={info}/> : null}
            <MainPanel info={info}
                       isShowAdditionalInfo={isShowAdditionalInfo}
                       onCreateOrder={onCreateOrder}
                       onToggleAdditionalPanel={toggleAdditionalPanel}/>
            <div className={css.fakeContainer}/>
        </React.Fragment>
    );
};

MobileView.propTypes = {
    info: BasketInfoPropType.isRequired,
    onCreateOrder: PropTypes.func.isRequired
};


const AdditionalPanel = ({info}) => {
    return (
        <div className={css.additionalFixed}>
            <div className={css.title}>
                Сумма заказа
            </div>
            <div className={css.info}>
                <div className={css.labels}>
                    <span>Общее количество:</span>
                    <span>Стоимость:</span>
                </div>
                <div className={css.values}>
                    <span>{`${info.productsModelQty} линеек (${info.productsQty} шт.)`}</span>
                    <span>{info.amount} сом</span>
                </div>
            </div>
            <hr className={css.line}/>
        </div>
    );
};

AdditionalPanel.propTypes = {info: BasketInfoPropType.isRequired};


const MainPanel = ({info, isShowAdditionalInfo, onCreateOrder, onToggleAdditionalPanel}) => {
    const amountWithDiscount = info.amount - info.discountAmount;

    return (
        <div className={css.mainFixed}>
            <div className={css.info}>
                <div className={css.labels}>
                    <span>Итого к оплате:</span>
                </div>
                <div className={css.values}>
                    <span>{amountWithDiscount} сом</span>
                </div>
            </div>
            <div className={css.buttonInfo} onClick={onToggleAdditionalPanel}>
                {isShowAdditionalInfo ? "Скрыть" : "Информация о заказе"}
            </div>
            <div className={css.buttonOrder} onClick={onCreateOrder}>
                Оформление заказа
            </div>
        </div>
    );
};

MainPanel.propTypes = {
    info: BasketInfoPropType.isRequired,
    isShowAdditionalInfo: PropTypes.bool.isRequired,
    onCreateOrder: PropTypes.func.isRequired,
    onToggleAdditionalPanel: PropTypes.func.isRequired
};