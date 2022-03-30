import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/scss";
import array from "lodash/array";
import {Card} from "src/shared/components/Card";



export const MobileView = ({cards}) => {
    const rows = array.chunk(cards, 4);
    return (
        <div>
            {
                rows.map((row, rowN) => {
                    return (
                        <Swiper key={rowN} slidesPerView={1.2}>
                            {
                                row.map((card, cardN) => {
                                    return (
                                        <SwiperSlide key={cardN}>
                                            <Card {...card}/>
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    );
                })
            }
        </div>
    );
};