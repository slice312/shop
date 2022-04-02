import React from "react";
import css from "./styles.module.scss";
import arrowUpIcon from "src/assets/icons/arrow-up.svg";
import xmarkIcon from "src/assets/icons/x-mark.svg";
import chatIcon from "src/assets/icons/chat.svg";


export const ControlPanel = ({mainPanelIsOpen, onChatClick, onArrowUpClick}) => {
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