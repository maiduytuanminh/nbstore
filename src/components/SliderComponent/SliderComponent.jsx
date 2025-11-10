import React from "react";
import { WrapperSliderStyle } from "./style";
import SlideItem from "./SlideItem";

const SliderComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    };

    const slides = [
        { type: "flash", id: 1 },
        { type: "hot", id: 2 },
        { type: "gift", id: 3 },
    ];

    return (
        <WrapperSliderStyle {...settings}>
            {slides.map((slide) => (
                <div key={slide.id}>
                    <SlideItem type={slide.type} />
                </div>
            ))}
        </WrapperSliderStyle>
    );
};

export default SliderComponent;
