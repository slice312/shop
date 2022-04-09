import React from "react";
import {isMobile} from "react-device-detect";
import {MobileView} from "./MobileView";
import {DesktopView} from "./DesktopView";


export const OrderInfo = () => {
    return (
        <React.Fragment>
            {
                isMobile
                    ? <MobileView/>
                    : <DesktopView/>
            }
        </React.Fragment>
    );
};
