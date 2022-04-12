import React from "react";
import {useSelector} from "react-redux";
import {Utils} from "src/shared/utils";
import {RequestCallbackModal} from "src/shared/components/RequestCallbackModal";
import css from "./styles.module.scss";
import telegramIcon from "src/assets/icons/telegram-fill.svg";
import whatsappIcon from "src/assets/icons/ant-design_whats-app-outlined.svg";
import telephoneIcon from "src/assets/icons/telephone.svg";


export const MainPanel = () => {
    const {telegramUrl, whatsappUrl} = useSelector(state => state.commonSiteInfo);
    const [isOpenCallModal, setIsOpenCallModal] = React.useState(false);

    const telegramRedirectClick = () => Utils.openUrlInNewWindow(telegramUrl);
    const whatsappRedirectClick = () => Utils.openUrlInNewWindow(whatsappUrl);
    const btnTelephoneClick = () => setIsOpenCallModal(true);


    return (
        <React.Fragment>
            <div className={css.panel}>
                <button className={css.telegram} type="button" onClick={telegramRedirectClick}>
                    <img src={telegramIcon} alt="telegramIcon"/>
                </button>
                <button className={css.whatsapp} type="button" onClick={whatsappRedirectClick}>
                    <img src={whatsappIcon} alt="whatsappIcon"/>
                </button>
                <button className={css.telephone} type="button" onClick={btnTelephoneClick}>
                    <img src={telephoneIcon} alt="telephoneIcon"/>
                </button>
            </div>
            {
                isOpenCallModal
                    ? <RequestCallbackModal onClose={() => setIsOpenCallModal(false)}/>
                    : null
            }
        </React.Fragment>
    );
};