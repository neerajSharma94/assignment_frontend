import { Typography } from "@mui/joy";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DateTimePickerValue from "../../components/DateTimePicker";
import Layout from "../../components/Layout";
import { UserContext } from "../../utils/UserContext";
import { axiosConfig, getDashboardUrl } from "../../utils/loginUtils";
import url from "../../utils/urls";

const AddMeasurements = () => {
    const navigator = useNavigate();
    const { state } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [measurement, setMeasurement] = useState({
        timestamp: dayjs(),
    });

    const handleChange = (k, v) =>
        setMeasurement((prev) => ({ ...prev, [k]: v }));

    const handleReset = () => {
        setLoading(false);
        setMeasurement({});
    };
    const handleSubmit = async () => {
        try {
            let { patientId, timestamp, heartRate } = measurement;
            if (!patientId || !timestamp || !heartRate) return;
            setLoading(true);
            let payload = {
                patientId: parseInt(patientId),
                timestamp,
                heartRate,
            };
            const config = axiosConfig(
                url.addPatientMeasurementUrl,
                "post",
                payload
            );
            const res = await axios.request(config);
            console.log("res", res);
            if (res.status === 201) {
                toast.success(res.data.message);
            }
            handleReset();
        } catch (error) {
            console.log("error from handleLogin", error);
            toast.error(
                error?.response?.data?.message || "Oops! something went wrong."
            );
            handleReset();
        }
    };

    useEffect(() => {
        if (!["nurse"].includes(state.role)) {
            const url = getDashboardUrl(state.role);
            navigator(url);
        }
    }, []);

    return (
        <Layout paperProps={{ height: 400 }}>
            <Typography level="h2" sx={{ textAlign: "center", mb: "auto" }}>
                Add Measurements
            </Typography>
            <TextField
                id="patient_id"
                label="Patient ID"
                variant="outlined"
                value={measurement.patientId || ""}
                onChange={(e) => handleChange("patientId", e.target.value)}
            />
            <TextField
                id="heartRate"
                label="Heart Rate"
                variant="outlined"
                value={measurement.heartRate || ""}
                onChange={(e) => handleChange("heartRate", e.target.value)}
            />
            <DateTimePickerValue
                handleChange={handleChange}
                value={measurement.timestamp}
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: "auto" }}
                disabled={
                    !measurement.patientId ||
                    !measurement.timestamp ||
                    !measurement.heartRate ||
                    loading
                }
            >
                {loading ? <CircularProgress color="#fff" /> : "Submit"}
            </Button>
        </Layout>
    );
};

export default AddMeasurements;
