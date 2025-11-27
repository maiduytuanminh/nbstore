import React from "react";
import {
    StyleNameProduct,
    WrapperCardStyle,
    WrapperPriceText,
    WrapperReportText,
    WrapperStyleTextSell,
    BestSellerBadge,
    CardImage,
    WrapperOutOfStock,
    OutOfStockText,
    DiscountBadge,
} from "./style";
import { StarFilled, FireOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
    const {
        countInStock,
        images,
        image,
        name,
        price,
        rating,
        discount,
        selled,
        id,
        isBestSeller,
    } = props;
    const navigate = useNavigate();

    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`);
    };

    // Kiểm tra xem có phải sản phẩm bán chạy không
    const isProductBestSeller = isBestSeller || selled >= 10;

    // Lấy ảnh chính, ưu tiên mảng images trước
    const mainImage = images && images.length > 0 ? images[0] : image || logo;

    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: "200px", height: "200px" }}
            style={{ width: 200 }}
            bodyStyle={{ padding: "14px" }}
            cover={
                <CardImage>
                    <img alt={name} src={mainImage} />
                    {isProductBestSeller && (
                        <BestSellerBadge>
                            <FireOutlined />
                            Bán chạy
                        </BestSellerBadge>
                    )}
                    {discount > 0 && (
                        <DiscountBadge>-{discount}%</DiscountBadge>
                    )}
                    {countInStock === 0 && (
                        <WrapperOutOfStock>
                            <OutOfStockText>Hết hàng</OutOfStockText>
                        </WrapperOutOfStock>
                    )}
                </CardImage>
            }
            onClick={() => handleDetailsProduct(id)}
        >
            <img
                src={logo}
                alt="Best seller badge"
                style={{
                    width: "68px",
                    height: "14px",
                    position: "absolute",
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: "3px",
                    opacity: 0.8,
                }}
            />

            <StyleNameProduct title={name}>{name}</StyleNameProduct>

            <WrapperReportText>
                <span style={{ marginRight: "4px" }}>
                    <span>{rating} </span>
                    <StarFilled
                        style={{ fontSize: "12px", color: "#FBBF24" }}
                    />
                </span>
                <WrapperStyleTextSell>
                    {" "}
                    | Đã bán {selled || 0}+
                </WrapperStyleTextSell>
            </WrapperReportText>

            <WrapperPriceText>{convertPrice(price)}</WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent;
