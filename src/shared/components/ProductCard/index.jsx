import React from "react";
import {Carousel} from "react-bootstrap";
import filledHearIcon from "src/assets/icons/filled-heart.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart.svg";
import "./styles.scss";


export const ProductCard = (
    {
        title,
        price,
        discount,
        isFavorite,
        size,
        images,
        colors
    }) => {

    const priceWithDiscount = Math.round(price - price * discount / 100);
    const roundedDiscount = Math.round(discount);

    // TODO: пока для вида сделал такой костыль, позже придумать как свазать с апи
    const [favState, setFavState] = React.useState(isFavorite);


    const handler = () => {
        console.log("click FavButton");
        setFavState(prev => !prev);
    };


    return (
        <div className="card__container">
            <div className="photo">
                <ImageSlides images={images}/>
                {
                    (roundedDiscount > 0)
                        ? <DiscountBadge discount={roundedDiscount}/>
                        : null
                }

                <FavButton isFavorite={favState} onClick={handler}/>
            </div>

            <div className="description">
                <div className="title">
                    {title}
                </div>
                <div>
                    <span className="price">{priceWithDiscount} c</span>
                    {
                        (roundedDiscount > 0)
                            ? <span className="oldPrice">{price} c</span>
                            : null
                    }
                </div>
                <div className="size">
                    Размер: {size}
                </div>
                <div className="colors">
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


const ImageSlides = ({images}) => {
    if (images.length === 1) {
        const img = images[0];
        return (
            <img src={img} alt={img}/>
        );
    }

    return (
        <Carousel interval={null} controls={false}>
            {
                images.map((x, i) => {
                    return (
                        <Carousel.Item key={i}>
                            <img className="d-block w-100" src={x} alt={x}/>
                        </Carousel.Item>
                    );
                })
            }
        </Carousel>
    );
};

const FavButton = ({isFavorite, onClick}) => {
    // TODO: получается click area немного выходит за иконку, потому что div прямоугольной формы
    return (
        <div className="favoriteButton" onClick={onClick}>
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
        <div className="discountBadge">
            <div className="discountTriangle"/>
            <div className="discountValue">{discount}%</div>
        </div>
    );
};

