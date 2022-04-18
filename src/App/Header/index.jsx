import React from "react";
import {isMobile} from "react-device-detect";

const Mobile = React.lazy(() => import("./Mobile")
    .then(module => ({default: module.Mobile})));

const Desktop = React.lazy(() => import("./Desktop")
    .then(module => ({default: module.Desktop})));


export const Header = () => {
    return (
        <React.Suspense fallback={null}>

            {
                isMobile
                    ? <Mobile/>
                    : <Desktop/>
            }
        </React.Suspense>
    );
};