import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet/dist/leaflet.css";
import { Input, Button, Card, Space, Alert } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import AddressFallback from "./AddressFallback";

// Fix cho marker icon trong React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapEvents = ({ onLocationSelect, mapRef }) => {
    const map = useMapEvents({
        click: (e) => {
            onLocationSelect(e.latlng);
        },
        // Lưu reference của map
        ready: () => {
            if (mapRef) {
                mapRef.current = map;
            }
        },
    });
    return null;
};

const AddressMapPicker = ({ onAddressSelect, currentAddress = "", isVisible = true }) => {
    const [address, setAddress] = useState(currentAddress);
    const [coordinates, setCoordinates] = useState({
        lat: 10.8231, // Default: Ho Chi Minh City
        lng: 106.6297,
    });
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        // Nếu có địa chỉ hiện tại, thử geocode để lấy tọa độ
        if (currentAddress && !coordinates.lat && !coordinates.lng) {
            handleSearch(currentAddress);
        }
    }, [currentAddress]);

    // Fix cho map trong modal
    useEffect(() => {
        if (isVisible && mapRef.current) {
            // Delay một chút để modal hoàn toàn render xong
            const timer = setTimeout(() => {
                if (mapRef.current) {
                    mapRef.current.invalidateSize();
                    mapRef.current.setView([coordinates.lat, coordinates.lng], 13);
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, coordinates]);

    const handleSearch = async (searchText) => {
        try {
            setIsSearching(true);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchText
                )}&limit=5&countrycodes=vn`
            );
            const data = await response.json();
            setSearchResults(data);
            setIsSearching(false);

            if (data.length > 0) {
                const firstResult = data[0];
                const newCoords = {
                    lat: parseFloat(firstResult.lat),
                    lng: parseFloat(firstResult.lon),
                };
                setCoordinates(newCoords);
                if (mapRef.current) {
                    mapRef.current.setView(newCoords, 16);
                }
                handleLocationSelect(newCoords, firstResult.display_name);
            }
        } catch (error) {
            console.error("Lỗi khi tìm kiếm địa chỉ:", error);
            setIsSearching(false);
        }
    };

    const handleLocationSelect = async (latlng, displayAddress = null) => {
        try {
            // Reverse geocoding để lấy địa chỉ từ tọa độ
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();

            const fullAddress = displayAddress || data.display_name;
            setAddress(fullAddress);
            setCoordinates(latlng);

            if (onAddressSelect) {
                const addressComponents = data.address || {};
                onAddressSelect({
                    fullAddress: fullAddress,
                    street:
                        addressComponents.road ||
                        addressComponents.street ||
                        "",
                    district:
                        addressComponents.suburb ||
                        addressComponents.district ||
                        "",
                    city:
                        addressComponents.city || addressComponents.town || "",
                    province: addressComponents.state || "",
                    coordinates: latlng,
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin địa chỉ:", error);
        }
    };

    const handleAddressInputChange = (e) => {
        const value = e.target.value;
        setAddress(value);
        if (value.length > 3) {
            handleSearch(value);
        }
    };

    return (
        <Card title="📍 Chọn địa chỉ giao hàng" style={{ width: "100%" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                {/* Address Input */}
                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: 8,
                            fontWeight: "bold",
                        }}
                    >
                        🏠 Địa chỉ:
                    </label>
                    <Input
                        placeholder="Nhập địa chỉ hoặc chọn trên bản đồ"
                        value={address}
                        onChange={handleAddressInputChange}
                        prefix={<EnvironmentOutlined />}
                    />
                </div>

                {/* Map */}
                <div
                    style={{
                        height: 400,
                        width: "100%",
                        position: "relative",
                        zIndex: 1
                    }}
                >
                    <MapContainer
                        center={[coordinates.lat, coordinates.lng]}
                        zoom={13}
                        style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "8px"
                        }}
                        whenReady={() => {
                            // Map đã sẵn sàng, invalidate size để đảm bảo render đúng
                            setTimeout(() => {
                                if (mapRef.current) {
                                    mapRef.current.invalidateSize();
                                }
                            }, 100);
                        }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[coordinates.lat, coordinates.lng]} />
                        <MapEvents onLocationSelect={handleLocationSelect} mapRef={mapRef} />
                    </MapContainer>
                </div>

                {/* Search Results */}
                {isSearching && (
                    <Alert
                        message="Đang tìm kiếm địa chỉ..."
                        type="info"
                        showIcon
                    />
                )}
                {searchResults.length > 0 && (
                    <Card size="small" title="Kết quả tìm kiếm">
                        {searchResults.map((result, index) => (
                            <Button
                                key={index}
                                type="link"
                                block
                                onClick={() =>
                                    handleLocationSelect(
                                        {
                                            lat: parseFloat(result.lat),
                                            lng: parseFloat(result.lon),
                                        },
                                        result.display_name
                                    )
                                }
                            >
                                {result.display_name}
                            </Button>
                        ))}
                    </Card>
                )}
            </Space>
        </Card>
    );
};

export default AddressMapPicker;
