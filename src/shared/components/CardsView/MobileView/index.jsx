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
                        <div>
                            <Swiper key={rowN} slidesPerView={1.27}>
                                {
                                    row.map((card, cardN) => {
                                        return (
                                            <SwiperSlide key={cardN}>
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