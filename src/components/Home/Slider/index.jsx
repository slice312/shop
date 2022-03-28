import React from "react";
import {Carousel} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {loadHomeSlideCards} from "src/shared/state/slider/actions";
import "./styles.scss";



export const Slider = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.homeSlider.images);

    React.useEffect(() => {
        dispatch(loadHomeSlideCards());
    }, [dispatch]);

    return (
        <div className="home__slider">
            <Carousel interval={4000} controls={false}>
                {
                    images.map((x, i) => {
                        return (
                            <Carousel.Item key={i}>
                                <img className="d-block w-100" src={x.src} alt={x.src}/>
                            </Carousel.Item>
                        );
                    })
                }
            </Carousel>
        </div>
    );
};