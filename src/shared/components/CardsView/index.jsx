import React from "react";
import {isMobile} from "react-device-detect";
import {DesktopView} from "./DesktopView";
import {MobileView} from "./MobileView";


export const CardsView = ({cards, CardElement}) => {
    // TODO: React.lazy почитать сделать так же, если оно тут
    return (
        <div>
            {
                isMobile
                    ? <MobileView cards={cards} CardElement={CardElement}/>
                    : <DesktopView cards={cards} CardElement={CardElement}/>
            }
        </div>
    );
};