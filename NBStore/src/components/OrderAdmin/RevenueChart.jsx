import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { convertPrice } from "../../utils";

const RevenueChart = ({ data }) => {
    console.log("=== RevenueChart received data ===", data);

    if (!data || data.length === 0) {
        return (
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--dark-text-secondary)",
                }}
            >
                Chưa có dữ liệu doanh thu
            </div>
        );
    }

    // Tính toán domain cho YAxis với khoảng cách 50 triệu mỗi bậc
    const values = data.map(item => item.value || 0);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    console.log("=== Raw Values ===", { values, minValue, maxValue });

    // Đơn vị: 50 triệu VND
    const step = 50000000;

    // Xử lý trường hợp đặc biệt khi maxValue < 50 triệu
    let yAxisMin, yAxisMax, tickCount;

    if (maxValue < step) {
        // Nếu doanh thu nhỏ hơn 50 triệu, dùng scale nhỏ hơn
        const smallStep = 10000000; // 10 triệu
        yAxisMin = 0;
        yAxisMax = Math.ceil(maxValue / smallStep) * smallStep;
        tickCount = Math.max(3, Math.ceil(yAxisMax / smallStep) + 1);
    } else {
        // Tính yAxisMin (làm tròn xuống theo bội số của 50 triệu)
        yAxisMin = Math.floor(Math.max(0, minValue) / step) * step;

        // Tính yAxisMax (làm tròn lên theo bội số của 50 triệu)
        yAxisMax = Math.ceil(maxValue / step) * step;

        // Tính số bậc cần thiết
        tickCount = Math.min(10, Math.max(3, (yAxisMax - yAxisMin) / step + 1));
    }

    console.log("=== YAxis Domain ===", {
        values,
        minValue,
        maxValue,
        yAxisMin,
        yAxisMax,
        step,
        tickCount
    });

    // Format ngắn gọn cho YAxis (triệu VND)
    const formatYAxisValue = (value) => {
        if (value === 0) return '0';
        if (value >= 1000000) {
            const millions = value / 1000000;
            return `${millions}M`;
        }
        return convertPrice(value);
    };    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 100,
                    bottom: 20,
                }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,0,0,0.1)"
                />
                <XAxis
                    dataKey="name"
                    stroke="var(--dark-text-secondary)"
                    tick={{ fill: "var(--dark-text-secondary)" }}
                />
                <YAxis
                    stroke="var(--dark-text-secondary)"
                    tick={{
                        fill: "var(--dark-text-secondary)",
                        fontSize: 12
                    }}
                    tickFormatter={formatYAxisValue}
                    domain={[yAxisMin, yAxisMax]}
                    type="number"
                    tickCount={tickCount}
                    allowDecimals={false}
                    width={90}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "var(--dark-bg-secondary)",
                        border: "1px solid var(--dark-border)",
                        borderRadius: "8px",
                    }}
                    labelStyle={{ color: "var(--dark-text-primary)" }}
                    formatter={(value) => [
                        convertPrice(value),
                        "Doanh thu",
                    ]}
                />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{
                        fill: "#10B981",
                        stroke: "#10B981",
                        r: 4,
                    }}
                    activeDot={{
                        r: 6,
                        stroke: "#10B981",
                        strokeWidth: 2,
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RevenueChart;
