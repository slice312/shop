import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {isMobile} from "react-device-detect";

import {basketReset} from "src/shared/state/basket/actions";
import {Api} from "src/shared/utils/api";
import {ModalOrder} from "src/shared/components/modals/ModalOrder";


const MobileView = React.lazy(() => import("./MobileView")
    .then(module => ({default: module.MobileView})));

const DesktopView = React.lazy(() => import("./DesktopView")
    .then(module => ({default: module.DesktopView})));



export const Info = () => {
    const dispatch = useDispatch();
    const basket = useSelector(state => state.basket);
    const info = basket.basketInfo;

    const [isShowModal, setIsShowModal] = React.useState(false);

    const openModalOrder = () => {
        setIsShowModal(true);
    };

    const closeModalOrder = () => {
        setIsShowModal(false);
    };

    const sendOrder = async (orderInfo) => {
        try {
            const response = await Api.SiteService.sendOrderInfo(orderInfo, basket.items);
            dispatch(basketReset());
            return response.status === 200;
        }
        catch (err) {
            console.error();
            return false;
        }
    };


    return (
        <React.Suspense fallback={null}>
            {
                isMobile
                    ? <MobileView info={info} onCreateOrder={openModalOrder}/>
                    : <DesktopView info={info} onCreateOrder={openModalOrder}/>
            }
            {
                (isShowModal)
                    ? <ModalOrder onClose={closeModalOrder} onCreateOrder={sendOrder}/>
                    : null
            }
        </React.Suspense>
    );
};
