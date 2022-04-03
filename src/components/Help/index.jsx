import {Accordion} from "react-bootstrap";
import css from "./styles.module.scss";
import image from "src/assets/img/help-page-img.png";


export const Help = () => {
    return (
        <div className={css.root}>
            <div className={css.image}>
                <img src={image} alt={image}/>
            </div>
            <div className={css.text}>
                <div className={css.title}>
                    Помощь
                </div>
                <div>
                    <Accordion alwaysOpen flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <span className={css.question}>Как я могу заказать одежду?</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={css.answer}>
                                    {TEXT}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <span className={css.question}>Как осуществляется доставка?</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={css.answer}>
                                    {TEXT}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                <span className={css.question}>Где производятся вещи?</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={css.answer}>
                                    {TEXT}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                <span className={css.question}>Как будет упакован заказ?</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={css.answer}>
                                    {TEXT}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                <span className={css.question}>Есть ли возврат, при условии если одежда пришла не того размера?</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={css.answer}>
                                    {TEXT}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>
                                <span className={css.question}>Как я могу оставить заявку на обратную связь</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={css.answer}>
                                    {TEXT}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};


const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a,
neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. Ut cras ut rhoncus
 fermentum pharetra a sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque 
 pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit.`;