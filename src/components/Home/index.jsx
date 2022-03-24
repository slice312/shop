// Import Swiper styles
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Pagination} from "swiper";
import sliceImage from "src/assets/mock/sliceImage.png";
import {loadHomeSlideCards} from "src/shared/state/slider/actions";
import {useDispatch, useSelector} from "react-redux";
import {} from "react-bootstrap"
import css from "./Home.module.scss"

export const Home = () => {
    console.log("Home render");

    const dispatch = useDispatch();
    const images = useSelector(state => state.homeSlider.images);
    React.useEffect(() => {
        dispatch(loadHomeSlideCards());
    }, []);

    return (
        <div>
            <Swiper modules={[Pagination, Autoplay]}
                    className="mySwiper"
                    pagination={{
                        bulletClass: css.bullet
                    }}
                    autoplay={
                        {delay: 4000}
                    }
                    effect="slide"
                    onPaginationRender={(sw, e)=> {
                        return <div>alala</div>
                    }}
            >
                {
                    images.map((x, i) => {
                        return (
                            <SwiperSlide key={i}>
                                {({ isActive }) => (
                                    <div>Current slide is {isActive ? 'active' : 'not active'}</div>
                                )}
                                <img src={x.src} alt={x.src}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {/*<Swiper*/}
            {/*    spaceBetween={50}*/}
            {/*    slidesPerView={2}*/}
            {/*    onSlideChange={() => console.log('slide change')}*/}
            {/*    onSwiper={(swiper) => console.log(swiper)}*/}
            {/*>*/}
            {/*    <SwiperSlide>*/}
            {/*        <img src={sliceImage} alt="sliceImage"/>*/}
            {/*    </SwiperSlide>*/}
            {/*</Swiper>*/}
        </div>
    );
};


const SlideCard = ({}) => {
    return (
        <div>

        </div>

    );
};