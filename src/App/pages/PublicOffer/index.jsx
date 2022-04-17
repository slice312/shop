import React from "react";
import {Api} from "src/shared/utils/api";
import css from "./styles.module.scss";


export const PublicOffer = () => {
    const [text, setText] = React.useState("");

    React.useEffect(() => {
        (async () => {
            try {
                const response = await Api.SiteService.getPublicOffer();
                if (response.status === 200) {
                    console.log("getPublicOfferText success");
                    setText(response.data);
                } else {
                    console.error("getPublicOfferText error", response.status);
                }
            } catch (err) {
                console.error("getPublicOfferText error", err);
            }
        })();
    }, []);

    return (
        <div className={css.root}>
            <div className={css.title}>
                Публичная оферта
            </div>
            <div className={css.text}>
                {text}
              </div>
        </div>
    );
};