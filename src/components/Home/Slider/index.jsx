import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Carousel} from "react-bootstrap";
import {Utils} from "src/shared/utils";
import {loadHomeAdSlideImages} from "src/shared/state/slider/actions";
import "./styles.scss";


export const Slider = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.homeAdSlides.slides);

    React.useEffect(() => {
        dispatch(loadHomeAdSlideImages());
    }, [dispatch]);


    return (
        <div className="home__slider">
            <Carousel interval={4000} controls={false}>
                {
                    images.map((x, i) => {
                        return (
                            <Carousel.Item key={i}>
                                <img className="slideImg"
                                     src={x.image} alt={x.image}
                                     onClick={() => Utils.openUrlInNewWindow(x.link)}
                                />
                            </Carousel.Item>
                        );
                    })
                }
            </Carousel>
        </div>
    );
};