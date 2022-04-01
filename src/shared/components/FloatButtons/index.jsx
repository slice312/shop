import React from "react";
import {useSelector} from "react-redux";
import css from "./styles.module.scss";
import arrowUpIcon from "src/assets/icons/arrow-up.svg";
import chatIcon from "src/assets/icons/chat.svg"
import xmarkIcon from "src/assets/icons/x-mark.svg"
import telegramIcon from "src/assets/icons/telegram-fill.svg";
import whatsappIcon from "src/assets/icons/ant-design_whats-app-outlined.svg";
import telephoneIcon from "src/assets/icons/telephone.svg";
import {RequestCallbackModal} from "../RequestCallbackModal";


export const FloatButtons = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    const toggleMainPanel = () => setIsOpen(prev => !prev);


    return (
        <div className={css.root}>
            <MainPanel isOpen={isOpen}/>
            <ControlPanel mainPanelIsOpen={isOpen}
                          onArrowUpClick={scrollToTop}
                          onChatClick={toggleMainPanel}
            />
        </div>
    );
};


const MainPanel = ({isOpen}) => {
    const {telegramUrl, whatsappUrl} = useSelector(state => state.siteCommonInfo);

    const [isOpenCallModal, setIsOpenCallModal] = React.useState(false);

    const btnCallClick = () => {
        setIsOpenCallModal(true);
    };

    const telegramRedirectClick = () => window.open(telegramUrl, "_blank");
    const whatsappRedirectClick = () => window.open(whatsappUrl, "_blank");


    return (
        <React.Fragment>
            {isOpen
                ? (
                    <div className={css.panel}>
                        <button className={css.telegram} type="button" onClick={telegramRedirectClick}>
                            <img src={telegramIcon} alt="telegramIcon"/>
                        </button>
                        <button className={css.whatsapp} type="button" onClick={whatsappRedirectClick}>
                            <img src={whatsappIcon} alt="whatsappIcon"/>
                        </button>
                        <button className={css.call} type="button" onClick={btnCallClick}>
                            <img src={telephoneIcon} alt="callIcon"/>
                        </button>
                    </div>
                )
                : null
            }
            {
                isOpenCallModal
                    ? <RequestCallbackModal onClose={() => setIsOpenCallModal(false)}/>
                    : null
            }
        </React.Fragment>
    );
};


const ControlPanel = ({mainPanelIsOpen, onChatClick, onArrowUpClick}) => {
    return (
        <div className={css.controlButtons}>
            <div>
                <button type="button" onClick={onArrowUpClick}>
                    <img src={arrowUpIcon} alt="arrowUpIcon"/>
                </button>
            </div>
            <div>
                <button type="button" onClick={onChatClick}>
                    {
                        mainPanelIsOpen
                            ? <img src={xmarkIcon} alt="xmarkIcon"/>
                            : <img src={chatIcon} alt="xmarkIcon"/>
                    }
                </button>
            </div>
        </div>
    );
};