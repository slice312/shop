import React from "react";
import {Api} from "src/shared/utils/api";
import css from "./styles.module.scss";


export const About = () => {
    const [info, setInfo] = React.useState({});

    React.useEffect(() => {
        (async () => {
            try {
                const response = await Api.SiteService.getAboutInfo();
                console.log("getAboutInfo success");
                setInfo(response.data);
            } catch (err) {
                console.error("getAboutInfo error", err);
            }
        })();
    }, []);

    const [img1, img2, img3] = (info.images?.length) ? info.images : [];


    return (
        <div className={css.root}>
            <div className={css.images}>
                <div className={css.column1}>
                    <div>
                        <img src={img1} alt="womanHandImg"/>
                    </div>
                    <div>
                        <img src={img3} alt="womanBeachImg"/>
                    </div>
                </div>
                <div className={css.column2}>
                    <img src={img2} alt="womanFaceImg"/>
                </div>
            </div>

            <div className={css.text}>
                <div className={css.container}>
                    <div className={css.title}>
                        О нас
                    </div>
                    <div className={css.description}>
                        {info.text}.
                    </div>
                </div>
            </div>
        </div>
    );
};