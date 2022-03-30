import React from "react";
import {isMobile} from "react-device-detect";
import {DesktopView} from "./DesktopView";
import {MobileView} from "./MobileView";



export const CardsView = ({cards}) => {
    return (
        <div>
            {
                isMobile
                    ? <MobileView cards={cards}/>
                    : <DesktopView cards={cards}/>
            }
        </div>
    );
};