import React from "react";
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/scss";
import lo from "lodash";
import cn from "classnames";

import {ProductInfoPropType} from "src/shared/constants/propTypes";
import css from "./styles.module.scss";

import shoppingBagIcon from "src/assets/icons/shopping-bag-white.svg";
import filledHeartIcon from "src/assets/icons/filled-heart-white.svg";
import emptyHeartIcon from "src/assets/icons/empty-heart-white.svg";


const propTypes = {
    product: ProductInfoPropType.isRequired,
    selectedColor: PropTypes.string.isRequired,
    inBasket: PropTypes.bool.isRequired,
    onChangeColor: PropTypes.func.isRequired,
    onChangeFavorite: PropTypes.func.isRequired,
    addToBasketOrRedirect: PropTypes.func.isRequired
};

export const MobileView = (
    {
        product,
        selectedColor,
        inBasket,
        onChangeColor,
        onChangeFavorite,
        addToBasketOrRedirect
    }) => {
    const [selectedImage, setSelectedImage] = React.useState("");

    const openImage = (imgSrc) => setSelectedImage(imgSrc);

    const priceWithDiscount = Math.round(product.price - product.price * product.discount / 100);


    return (
        <div className={css.root}>
            <div className={css.photos}>
                {
                    <Swiper slidesPerView={1.25}>
                        {
                            lo.take(product.images, 8)
                                .map((imgSrc, i) => {
                                    return (
                                        <SwiperSlide key={i} className={css.slide}>
                                            <img key={i}
                                                 src={imgSrc} alt={imgSrc}
                                                 onClick={() => openImage(imgSrc)}
                                            />
                                        </SwiperSlide>
                                    );
                                })
                        }
                    </Swiper>
                }
            </div>
            <div className={css.info}>
                <div className={css.title}>
                    {product.title}
                </div>
                <div className={css.vendor}>
                    <span>Артикул:</span>
                    <span className={css.vendorValue}>{product.vendorCode}</span>
                </div>
                <div className={css.color}>
                    <span>Цвет:</span>
                    <span className={css.colorButtons}>
                        {
                            product.colors?.map((x, i) =>
                                <div key={i} className={cn(css.buttonDiv, x === selectedColor ? css.active : null)}>
                                    <button type="button"
                                            style={{backgroundColor: x}}
                                            onClick={() => onChangeColor(x)}
                                    />
                                </div>
                            )
                        }
                    </span>
                </div>
                <div className={css.price}>
                    <span>{priceWithDiscount || 0}</span>
                    <span className={css.oldPrice}>{product.price || 0} с</span>
                </div>
                <div className={css.description}>
                    <div className={css.title}>О товаре:</div>
                    <div className={css.text}>{product.description}</div>
                </div>
                <div className={css.props}>
                    <div>
                        <span className={css.propsLabel}>Размерный ряд:</span>
                        <span className={css.propsValue}>{product.size}</span>
                    </div>
                    <div>
                        <span className={css.propsLabel}>Количество в линейке:</span>
                        <span className={css.propsValue}>{product.qty}</span>
                    </div>
                    <div>
                        <span className={css.propsLabel}>Состав ткани:</span>
                        <span className={css.propsValue}>{product.fabricStructure}</span>
                    </div>
                    <div>
                        <span className={css.propsLabel}>Материал:</span>
                        <span className={css.propsValue}>{product.material}</span>
                    </div>
                </div>
                <div className={css.buttons}>
                    <div className={cn(css.buttonShoppingBag, css.buttonHovered)}
                         onClick={addToBasketOrRedirect}
                    >
                        <img src={shoppingBagIcon} alt="shoppingBagIcon"/>
                        <span>
                                {inBasket ? "Перейти в корзину" : "Добавить в корзину"}
                            </span>
                    </div>
                    <div className={cn(css.buttonFavorite, css.buttonHovered)}
                         onClick={onChangeFavorite}
                    >
                        {
                            product.isFavorite
                                ? <img src={filledHeartIcon} alt="filledHeartIcon"/>
                                : <img src={emptyHeartIcon} alt="emptyHeartIcon"/>
                        }
                    </div>
                </div>
            </div>
            {
                <Modal show={!!selectedImage}
                       onHide={() => setSelectedImage("")}>
                    <img src={selectedImage} alt={selectedImage}/>
                </Modal>
            }
        </div>
    );
};

MobileView.propTypes = propTypes;