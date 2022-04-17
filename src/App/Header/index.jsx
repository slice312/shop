import React from "react";
import {isMobile} from "react-device-detect";
import {Mobile} from "./Mobile";
import {Desktop} from "./Desktop";


export const Header = () => {
    return (
        <React.Fragment>
            {
                isMobile
                    ? <Mobile/>
                    : <Desktop/>
            }
        </React.Fragment>
    );
};