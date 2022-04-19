import React from "react";
import {Accordion} from "react-bootstrap";

import {Api} from "src/shared/utils/api";
import "./styles.scss";

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
        <div className="help_page">
            <div className="help_page__image">
                <img src={image} alt={image}/>
            </div>
            <div className="help_page__textBlock">
                <div className="title">
                    Помощь
                </div>
                <div className="faqBlock">
                    <Accordion alwaysOpen flush defaultActiveKey={"0"}>
                        {
                            faqs.map((x, i) => {
                                return (
                                    <Accordion.Item key={i}
                                                    eventKey={i.toString()}
                                                    className="item"
                                    >
                                        <Accordion.Header>
                                            <span className="question">{x.question}</span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="answer">
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