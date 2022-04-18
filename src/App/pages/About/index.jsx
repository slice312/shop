import React from "react";
import {Api} from "src/shared/utils/api";
import css from "./styles.module.scss";


export const About = () => {
    const [info, setInfo] = React.useState({});

    React.useEffect(() => {
        (async () => {
            try {
                const response = await Api.Common.getAboutInfo();
                setInfo(response.data);
                console.log("getAboutInfo success");
            } catch (err) {
                console.error("getAboutInfo", err);
            }
        })();
    }, []);

    const [img1, img2, img3] = (info.images?.length) ? info.images : [];


    return (
        <div className={css.root}>
            <div className={css.images}>
                <div className={css.column1}>
                    <div>
                        <img src={img1} alt={img1}/>
                    </div>
                    <div>
                        <img src={img3} alt={img3}/>
                    </div>
                </div>
                <div className={css.column2}>
                    <img src={img2} alt={img2}/>
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