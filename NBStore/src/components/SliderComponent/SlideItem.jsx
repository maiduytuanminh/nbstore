import React from "react";
import {
    SlideContainer,
    SlideContent,
    SlideTitle,
    SlideSubtitle,
    SlideDescription,
} from "./SlideItemStyle";

const SlideItem = ({ type, data }) => {
    const slideConfigs = {
        flash: {
            title: "FLASH SALE",
            subtitle: "Giảm giá cực sốc lên đến 50%",
            image: "https://supersports.com.vn/cdn/shop/files/11.11_VC_ontop_1545_500.jpg?v=1762698470&width=1920",
        },
        hot: {
            image: "https://file.hstatic.net/200000581855/file/banner_2_7f759d8e36d34b30b998978830194a14_master.png",
        },
        gift: {
            image: "https://file.hstatic.net/200000581855/file/banner_pc_chinh_sach_33732a5f5fcd4f44afc6a341f239ee7a_master.png",
        },
    };

    const config = slideConfigs[type] || slideConfigs.flash;

    return (
        <SlideContainer image={config.image}>
            <SlideContent>
                <div
                    style={{
                        textAlign: "center",
                        zIndex: 3,
                        position: "relative",
                    }}
                >
                    <SlideTitle>{config.title}</SlideTitle>

                    <SlideSubtitle>{config.subtitle}</SlideSubtitle>

                    <SlideDescription>{config.description}</SlideDescription>
                </div>
            </SlideContent>
        </SlideContainer>
    );
};

export default SlideItem;
