import React from "react";
import css from "./Card.module.scss";
import cardImg from "src/assets/mock/cards/card1.png";
import filledHearIcon from "src/assets/icons/filled-heart.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart.svg";
import {Api} from "src/shared/utils/api"


export const GetCard = () => {
    React.useEffect(async () => {
        const resp = await Api.getBestsellers(8);
        console.log(resp);
    }, []);
    return (
        <div></div>
    );
};


export const Card = (
    {
        title,
        price,
        discount,
        isFavorite,
        size,
        imgSrc,
        colors
    }) => {

    const priceWithDiscount = price - price * discount / 100;


    const handler = () => {
        console.log("cliocl");
    }
    return (
        <div className={css.root}>
            <div className={css.photo}>
                <img src={imgSrc} alt="imgSrc"/>


                <DiscountBadge discount={discount}/>

                <FavButton isFavorite={isFavorite} onClick={handler}/>
                <Slider/>
            </div>

            <div className={css.description}>
                <div className={css.title}>
                    {title}
                </div>
                <div>
                    <span className={css.price}>{priceWithDiscount} c</span>
                    {
                        (discount > 0)
                            ? <span className={css.oldPrice}>{price} c</span>
                            : null
                    }
                </div>
                <div className={css.size}>
                    Размер: {size}
                </div>
                <div className={css.colors}>
                    {
                        colors.map((x, i) =>
                            <button key={i} type="button" style={{backgroundColor: x}}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};


const FavButton = ({isFavorite, onClick}) => {

    // TODO: получается click area немного выходит за иконку, потому что div прямоугольной формы
    return (
        <div className={css.favoriteButton} onClick={onClick}>
            {
                isFavorite
                    ? <img src={filledHearIcon} alt="filledHearIcon"/>
                    : <img src={emptyHeartIcon} alt="emptyHeartIcon"/>
            }
        </div>
    );
}

const DiscountBadge = ({discount}) => {
    return (
        <div className={css.discountBadge}>
            <div className={css.discountTriangle}/>
            <div className={css.discountValue}>{discount}%</div>
        </div>
    );
};

const Slider = () => {
    return (
        <div className={css.sliderWrap}>
            <div className={css.slider}>
                <button className={css.active} type="button"/>
                <button type="button"/>
                <button type="button"/>
                <button type="button"/>
            </div>
        </div>
    );
};