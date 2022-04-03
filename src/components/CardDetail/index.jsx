import {Container, Row, Col} from "react-bootstrap";
import css from "./styles.module.scss";
import shoppingBagIcon from "src/assets/icons/shopping-bag-white.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart-white.svg";
import filledHeartIcon from "src/assets/icons/filled-heart-white.svg";
import array from "lodash/array";


const card = {
    id: "cbca4382-982c-4b6a-be80-b56e4f368d33",
    vendorCode: "Платье PL984/dakota", // TODO: добавить поле
    title: "Вечернее платье",
    price: 2700,
    discount: 50,
    isFavorite: true,
    size: "42-50",
    images: [
        `https://i.ibb.co/fGGXMQG/card1.png`,
        `https://i.ibb.co/fGGXMQG/card1.png`,
        `https://i.ibb.co/fGGXMQG/card1.png`,
        `https://i.ibb.co/fGGXMQG/card1.png`,
        `https://i.ibb.co/fGGXMQG/card1.png`,
        `https://i.ibb.co/fGGXMQG/card1.png`,
        `https://i.ibb.co/fGGXMQG/card1.png`,
        `https://i.ibb.co/fGGXMQG/card1.png`
    ],
    colors: ["#73A39D", "#84CC4C", "#B5A8A1", "#AB844A",
        "#6977F0", "#FFFFFF", "#141414", "#FF0000"],
    // TODO: добавить поле
    description: " За последние 35 лет бренд Bonucci из обычного производителя одежды " +
        "превратился в широко узнаваемую марку, а его продукция – в синоним высокого" +
        " качества и актуального стиля."
};

export const CardDetail = () => {

    const items2 = array.take(card.images, 2);
    const items4 = array.take(card.images, 4);

    const src = `https://i.ibb.co/fGGXMQG/card1.png`;
    return (
        <div className={css.root}>
            <div className={css.column1}>
                <Container>
                    <Row >
                        <Col md={6}>
                            <img src={src} alt={src}/>
                        </Col>
                        <Col md={6}>
                            <img src={src} alt={src}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <img src={src} alt={src}/>
                        </Col>
                        <Col md={6}>
                            <img src={src} alt={src}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <img src={src} alt={src}/>
                        </Col>
                        <Col md={3}>
                            <img src={src} alt={src}/>
                        </Col>
                        <Col md={3}>
                            <img src={src} alt={src}/>
                        </Col>
                        <Col md={3}>
                            <img src={src} alt={src}/>
                        </Col>
                    </Row>
                </Container>

            </div>


            <div className={css.column2}>
                <div className={css.title}>
                    {card.title}
                </div>
                <div className={css.vendor}>
                    <span className={css.vendorLabel}>Артикул:</span>
                    <span className={css.vendorValue}>{card.vendorCode}</span>
                </div>
                <div className={css.color}>
                    <span className={css.colorLabel}>Цвет:</span>
                </div>
                <div className={css.price}>
                    <span>{card.price}</span>
                    <span className={css.oldPrice}>
                        {7229} с
                    </span>
                </div>
                <div className={css.description}>
                    <div className={css.title}>
                        О товаре:
                    </div>
                    <div className={css.text}>
                        {card.description}
                    </div>
                </div>
                <div className={css.props}>
                    Размерный ряд
                </div>
                <div className={css.buttons}>
                    <div>
                        <img src={shoppingBagIcon} alt="shoppingBagIcon"/>
                        Добавить в корзину
                    </div>
                    <div>
                        <img src={emptyHeartIcon} alt="emptyHeartIcon"/>

                    </div>
                </div>

            </div>
        </div>
    );
};