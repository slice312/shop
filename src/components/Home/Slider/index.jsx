import React from "react";
import {Carousel} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {loadHomeSlideCards} from "src/shared/state/slider/actions";
import "./carousel.scss";


export const Slider = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.homeSlider.images);

    React.useEffect(() => {
        dispatch(loadHomeSlideCards());
    }, []);

    return (
        <Carousel interval={4000} controls={false}>
            {
                images.map((x, i) => {
                    return (
                        <Carousel.Item>
                            <img className="d-block w-100" src={x.src} alt={x.src}/>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    );
};