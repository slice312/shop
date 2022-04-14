import React from "react";
import {isMobile} from "react-device-detect";

const MobileView = React.lazy(() => import("./MobileView")
    .then(module => ({default: module.MobileView})));

const DesktopView = React.lazy(() => import("./DesktopView")
    .then(module => ({default: module.DesktopView})));


// TODO: рещил удалить это, оставить только MobileView как shared, а Desktop контайнер простой и специцфичный под
// разные страницы, его лучше на месте реализовывать
export const CardsView = ({cards, CardElement}) => {
    return (
        <React.Suspense fallback={null}>
            {
                isMobile
                    ? <MobileView cards={cards} CardElement={CardElement}/>
                    : <DesktopView cards={cards} CardElement={CardElement}/>
            }
        </React.Suspense>
    );
};