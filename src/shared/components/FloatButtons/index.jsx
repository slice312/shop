import React from "react";
import {MainPanel} from "./MainPanel";
import {ControlPanel} from "./ControlPanel";
import css from "./styles.module.scss";


// TODO: надо как-то придумать fixed позиционирование но относительно документа
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
            {
                isOpen
                    ? <MainPanel isOpen={isOpen}/>
                    : null
            }
            <ControlPanel mainPanelIsOpen={isOpen}
                          onArrowUpClick={scrollToTop}
                          onChatClick={toggleMainPanel}
            />
        </div>
    );
};