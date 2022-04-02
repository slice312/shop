import css from "./styles.module.scss";
import womanHandImg from "src/assets/img/about-page-wowan-hand.png";
import womanBeachImg from "src/assets/img/about-page-woman-beach.png";
import womanFaceImg from "src/assets/img/about-page-woman-face.png";


export const About = () => {
    return (
        <div className={css.root}>
            <div className={css.images}>
                <div className={css.column1}>
                    <div>
                        <img src={womanHandImg} alt="womanHandImg"/>
                    </div>
                    <div>
                        <img src={womanBeachImg} alt="womanBeachImg"/>
                    </div>
                </div>
                <div className={css.column2}>
                    <img src={womanFaceImg} alt="womanFaceImg"/>
                </div>
            </div>

            <div className={css.text}>
                <div className={css.container}>
                    <div className={css.title}>
                        О нас
                    </div>
                    <div className={css.description}>
                        У нас Вы найдёте всё, что Вам так нужно. Ассортимент магазина постоянно расширяется
                        и дополняется в зависимости от пожеланий клиентов. Женская одежда из наших коллекций – это
                        комфортная,
                        стильная и качественная одежда не только на каждый день, но и для любых ситуаций по доступным
                        ценам.Натуральные материалы, продуманные силуэты, современный дизайн и возможность легкого
                        сочетания
                        моделей помогут Вам всегда оставаться в центре внимания и чувствовать себя уместно в любой
                        ситуации.Если
                        Вы любите одеваться ярко, модно и оригинально, у нас Вы найдете все необходимое, чтобы всегда
                        быть в
                        центре внимания. У нас большая коллекция для любого торжества и праздника, которая сможет
                        удовлетворить
                        вкус самой взыскательной модницы! А для деловых ситуаций, в которых Вам непременно нужно
                        выглядеть
                        элегантно и стильно, мы предлагаем Вам одежду из коллекции "деловой стиль и офис". Мода
                        постоянно
                        диктует нам свои требования и для современной девушки, желающей идти в ногу со временем, важно
                        иметь
                        возможность постоянно пополнять свой гардероб стильной одеждой.
                    </div>
                </div>
            </div>
        </div>
    );
};