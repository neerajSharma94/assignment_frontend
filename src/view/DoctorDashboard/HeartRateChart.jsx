import { Typography } from "@mui/joy";
import { Box } from "@mui/material";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

// Register the required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const defaultData = {
    timestamp: [],
    heartRate: [],
    patientId: "",
};
const HeartRateChart = ({ measurements = {} }) => {
    const [data, setData] = useState(defaultData);

    useEffect(() => {
        if (measurements?.data?.length) {
            const timestamp = [];
            const heartRate = [];
            measurements.data.forEach((item) => {
                timestamp.push(item.timestamp);
                heartRate.push(item.heartRate);
            });
            setData({
                timestamp,
                heartRate,
                patientId: measurements.patientId,
            });
        }
        return () => {
            setData(defaultData);
        };
    }, [measurements]);

    const chartData = {
        labels: data.timestamp,
        datasets: [
            {
                label: "Heartbeat",
                data: data.heartRate,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Ensures the chart stretches to fit its container
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Heartbeat per Timestamp",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Timestamp",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Heartbeat (bpm)",
                },
                min: 0,
            },
        },
    };

    return (
        <>
            <Typography level="h3" sx={{ mb: "10px" }}>
                Patient ID- {data?.patientId}
            </Typography>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "calc(100% - 60px)",
                    overflow: "hidden",
                }}
            >
                <Line data={chartData} options={options} />;
            </Box>
        </>
    );
};

export default HeartRateChart;
