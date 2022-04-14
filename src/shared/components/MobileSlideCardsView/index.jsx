import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/scss";
import array from "lodash/array";
import css from "./styles.module.scss";


const propTypes = {
    products: PropTypes.array.isRequired,
    CardElement: PropTypes.elementType.isRequired,
    chunkSize: PropTypes.number,
    slidesPerView : PropTypes.number,
    className: PropTypes.string
};

export const MobileSlideCardsView = ({products, CardElement, chunkSize, slidesPerView, className}) => {
    chunkSize = (chunkSize) ? chunkSize : 4;
    slidesPerView = (slidesPerView) ? slidesPerView : 1.15

    const rows = array.chunk(products, chunkSize);

    return (
        <div className={cn(css.root, className)}>
            {
                rows.map((row, rowN) => {
                    return (
                        <div key={rowN}>
                            <Swiper slidesPerView={slidesPerView}>
                                {
                                    row.map((product, productN) => {
                                        return (
                                            <SwiperSlide key={productN} className={css.slide}>
                                                <CardElement {...product}/>
                                            </SwiperSlide>
                                        );
                                    })
                                }
                            </Swiper>
                        </div>
                    );
                })
            }
        </div>
    );
};

MobileSlideCardsView.propTypes = propTypes;