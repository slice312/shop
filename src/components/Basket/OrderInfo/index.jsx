import React from "react";
import {useSelector} from "react-redux";
import {isMobile} from "react-device-detect";

const MobileView = React.lazy(() => import("./MobileView")
    .then(module => ({default: module.MobileView})));

const DesktopView = React.lazy(() => import("./DesktopView")
    .then(module => ({default: module.DesktopView})));


export const OrderInfo = () => {
    const info = useSelector(state => state.order);


    const makeOrder = () => {

    };

    return (
        <React.Suspense fallback={null}>
            {
                isMobile
                    ? <MobileView info={info} onMakeOrder={makeOrder}/>
                    : <DesktopView info={info} onMakeOrder={makeOrder}/>
            }
        </React.Suspense>
    );
};
