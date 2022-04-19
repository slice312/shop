import React from "react";
import PropTypes from "prop-types";
import {Carousel} from "react-bootstrap";

import "./styles.scss"


const propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func
};

export const ImageSlides = ({images, onClick}) => {
    if (images.length === 1) {
        const img = images[0];
        return (<img className="image" src={img} alt={img} onClick={onClick}/>);
    }

    return (
        <div className="productCard__imageSlides">
            <Carousel interval={null} controls={false}>
                {
                    images.map((x, i) => {
                        return (
                            <Carousel.Item key={i}>
                                <img className="image" src={x} alt={x} onClick={onClick}/>
                            </Carousel.Item>
                        );
                    })
                }
            </Carousel>
        </div>
    );
};

ImageSlides.propTypes = propTypes;