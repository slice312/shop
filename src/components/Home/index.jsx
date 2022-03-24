// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import sliceImage from "src/assets/mock/sliceImage.png";
import {loadHomeSlideCards} from "src/shared/state/slider/actions";
import {useDispatch, useSelector} from "react-redux";


// Import Swiper styles
export const Home = () => {

    const dispatch = useDispatch();
    const images = useSelector(state => state.homeSlider.images);


    return (
        <div>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                <SwiperSlide>
                    1
                    <img src="https://i.ibb.co/zNSmhCT/slice-Image.png" alt="slice-Image" border="0"/>
                </SwiperSlide>
                <SwiperSlide>
                    2
                    <img  alt="sliceImage"/>
                </SwiperSlide>
                <SwiperSlide>
                    3
                    <img  alt="sliceImage"/>
                </SwiperSlide>
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