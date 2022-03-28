import React from "react";
import {Api} from "src/shared/utils/api";
import {Card} from "src/components/Card";
import css from "./Bestsellers.module.scss";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

// TODO:  на мобилке использовать swiper js
// и там свойство есть slidePrview={1.2}



export const Bestsellers = () => {

    return (
        <div>
            <h2>Хиты продаж</h2>
            <BrowserView>
                <Desktop/>
            </BrowserView>
            <MobileView>
                Хер там
            </MobileView>
        </div>
    );
};




export const Desktop = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        (async function () {
            const resp = await Api.getBestsellers(8);
            setData(resp.data);
            console.log(resp);
        })();
    }, []);

    return (
        <div className={css.flex}>
            {
                data.map((x, i) =>
                    <Card key={i} {...x}/>
                )
            }
        </div>
    );
};