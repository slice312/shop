import React from "react";
import {useSelector} from "react-redux";
import {isMobile} from "react-device-detect";
import {OrderModal} from "../../../shared/components/OrderModal";

const MobileView = React.lazy(() => import("./MobileView")
    .then(module => ({default: module.MobileView})));

const DesktopView = React.lazy(() => import("./DesktopView")
    .then(module => ({default: module.DesktopView})));


export const OrderInfo = () => {
    const info = useSelector(state => state.order);

    const [isShowModal, setIsShowModal] = React.useState(false);

    const makeOrder = () => {
        setIsShowModal(true);
    };

    const closeOrder = () => {
        setIsShowModal(false);
    };


    return (
        <React.Suspense fallback={null}>
            {
                isMobile
                    ? <MobileView info={info} onMakeOrder={makeOrder}/>
                    : <DesktopView info={info} onMakeOrder={makeOrder}/>
            }
            {
                (isShowModal)
                    ? <OrderModal onClose={closeOrder}/>
                    : null
            }
        </React.Suspense>
    );
};
