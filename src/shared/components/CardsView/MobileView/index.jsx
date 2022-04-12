import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/scss";
import array from "lodash/array";
import css from "./styles.module.scss";


export const MobileView = ({cards, CardElement}) => {
    const rows = array.chunk(cards, 4);
    return (
        <div className={css.root}>
            {
                rows.map((row, rowN) => {
                    return (
                        <div key={rowN}>
                            <Swiper slidesPerView={1.15}>
                                {
                                    row.map((card, cardN) => {
                                        return (
                                            <SwiperSlide key={cardN} className={css.slide}>
                                                <CardElement {...card}/>
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