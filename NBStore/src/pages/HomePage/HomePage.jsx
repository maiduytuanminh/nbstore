import React, { useState, useEffect } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import ServiceCommitments from "../../components/ServiceCommitments/ServiceCommitments";
import BrandShowcase from "../../components/BrandShowcase/BrandShowcase";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import StatsCounter from "../../components/StatsCounter/StatsCounter";

import { WrapperTypeProduct, MainContent } from "./style";

import Loading from "../../components/LoadingComponent/Loading";

const HomePage = () => {
    const [loading, setLoading] = useState(false);

    return (
        <Loading isLoading={loading}>
            {/* Hero Slider - Full Width */}
            <SliderComponent />

            {/* Main Content Section */}
            <MainContent>
            </MainContent>

            {/* Additional Sections */}
            <ServiceCommitments />
            <BrandShowcase />
            <FeaturesSection />
            <StatsCounter />
        </Loading>
    );
};

export default HomePage;
