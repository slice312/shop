import React from "react";
import css from "./styles.module.scss";
import arrowUpIcon from "src/assets/icons/arrow-up.svg";
import chatIcon from "src/assets/icons/chat.svg"
import xmarkIcon from "src/assets/icons/x-mark.svg"
import telegramIcon from "src/assets/icons/telegram-fill.svg";
import whatsappIcon from "src/assets/icons/ant-design_whats-app-outlined.svg";
import callIcon from "src/assets/icons/call.svg";
import {Modal, Button} from "react-bootstrap"


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
    const handle = () => ({});
    return (
        <React.Fragment>
            {isOpen
                ? (
                    <div className={css.panel}>
                        <button className={css.telegram} type="button" onClick={handle}>
                            <img src={telegramIcon} alt="telegramIcon"/>
                        </button>
                        <button className={css.whatsapp} type="button" onClick={handle}>
                            <img src={whatsappIcon} alt="whatsappIcon"/>
                        </button>
                        <button className={css.call} type="button" onClick={handle}>
                            <img src={callIcon} alt="callIcon"/>
                        </button>
                    </div>
                )
                : null
            }

            <Modal show={false} onHide={() => console.log("hide")}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => console.log("close")}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => console.log("clise")}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
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