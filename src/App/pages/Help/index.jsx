import React from "react";
import {Accordion} from "react-bootstrap";

import {Api} from "src/shared/utils/api";
import css from "./styles.module.scss";

import image from "src/assets/img/help-page-img.png";


export const Help = () => {
    const [faqs, setFaqs] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            try {
                const response = await Api.Common.getFaq();
                console.log("getFaq success");
                setFaqs(response.data);
            } catch (err) {
                console.error("getFaq", err);
            }
        })();
    }, []);


    return (
        <div className={css.root}>
            <div className={css.image}>
                <img src={image} alt={image}/>
            </div>
            <div className={css.textBlock}>
                <div className={css.title}>
                    Помощь
                </div>
                <div className={css.faqBlock}>
                    <Accordion alwaysOpen flush defaultActiveKey={"0"}>
                        {
                            faqs.map((x, i) => {
                                return (
                                    <Accordion.Item key={i}
                                                    eventKey={i.toString()}
                                                    className={css.item}
                                    >
                                        <Accordion.Header>
                                            <span className={css.question}>{x.question}</span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className={css.answer}>
                                                {x.answer}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                );
                            })
                        }
                    </Accordion>
                </div>
            </div>
        </div>
    );
};