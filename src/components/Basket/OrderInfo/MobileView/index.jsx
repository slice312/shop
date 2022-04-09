import React from "react";
import css from "./styles.module.scss";


export const MobileView = () => {

    const [isShowAdditionalInfo, setIsShowAdditionalInfo] = React.useState(false);

    const toggleAdditionalPanel = () => setIsShowAdditionalInfo(prev => !prev);

    const totalAmount = 6825;
    const totalAmountWithDiscount = 6700;

    const totalQty = "4 линеек (20 шт.)"

    return (
        <React.Fragment>
            {isShowAdditionalInfo ? <AdditionalPanel/> : null}
            <MainPanel isShowAdditionalInfo={isShowAdditionalInfo}
                       onToggleAdditionalPanel={toggleAdditionalPanel}/>
            <div className={css.fakeContainer}/>
        </React.Fragment>
    );
};


const AdditionalPanel = () => {
    const totalAmount = 6825;
    const totalAmountWithDiscount = 6700;

    const totalQty = "4 линеек (20 шт.)"
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
                    <span>{totalQty}</span>
                    <span>{totalAmount} шт</span>
                </div>
            </div>
            <hr className={css.line}/>
        </div>
    );
};


const MainPanel = ({isShowAdditionalInfo, onToggleAdditionalPanel}) => {
    const totalAmountWithDiscount = 6700;

    return (
        <div className={css.mainFixed}>
            <div className={css.info}>
                <div className={css.labels}>
                    <span>Итого к оплате:</span>
                </div>
                <div className={css.values}>
                    <span>{totalAmountWithDiscount} сом</span>
                </div>
            </div>
            <div className={css.buttonInfo} onClick={onToggleAdditionalPanel}>
                {isShowAdditionalInfo ? "Скрыть" : "Информация о заказе"}
            </div>
            <div className={css.buttonOrder}>
                Оформление заказа
            </div>
        </div>
    );
};