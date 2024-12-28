import { Typography } from "@mui/joy";
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { UserContext } from "../../utils/UserContext";
import { axiosConfig, getDashboardUrl } from "../../utils/loginUtils";
import url from "../../utils/urls";

const AddPatientComponent = () => {
    const navigator = useNavigate();
    const { state } = useContext(UserContext);
    const [patientInfo, setPatientInfo] = useState({});

    const [loading, setLoading] = useState(false);
    const handleReset = () => {
        setLoading(false);
        setPatientInfo({});
    };
    const handleChange = (k, v) =>
        setPatientInfo((prev) => ({ ...prev, [k]: v }));

    const handleSubmit = async () => {
        try {
            let { name, age, height, gender, temperature, weight } =
                patientInfo;
            if (!name || !age || !height || !gender || !temperature || !weight)
                return;
            setLoading(true);
            let payload = { name, age, height, gender, temperature, weight };
            const config = axiosConfig(url.addPatientUrl, "post", payload);
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
        <Layout maxWidth="lg" paperProps={{ width: 600 }}>
            <Typography level="h2" sx={{ textAlign: "center", mb: "auto" }}>
                Add Patient
            </Typography>
            <TextField
                id="name"
                label="name"
                variant="outlined"
                value={patientInfo.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
            />
            <TextField
                id="age"
                label="Age"
                variant="outlined"
                type="number"
                value={patientInfo.age || ""}
                onChange={(e) => handleChange("age", e.target.value)}
            />
            <TextField
                id="height"
                label="Height"
                variant="outlined"
                value={patientInfo.height || ""}
                onChange={(e) => handleChange("height", e.target.value)}
            />
            <TextField
                id="weight"
                label="Weight"
                variant="outlined"
                type="number"
                value={patientInfo.weight || ""}
                onChange={(e) => handleChange("weight", e.target.value)}
            />
            <TextField
                id="temperature"
                label="Temperature"
                variant="outlined"
                type="number"
                value={patientInfo.temperature || ""}
                onChange={(e) => handleChange("temperature", e.target.value)}
            />
            <FormControl fullWidth>
                <InputLabel id="gender_label">Male</InputLabel>
                <Select
                    labelId="gender_label"
                    id="gender_label"
                    value={patientInfo.gender || ""}
                    label="Gender"
                    onChange={(e) => handleChange("gender", e.target.value)}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: "auto" }}
                disabled={
                    !patientInfo.name ||
                    !patientInfo.age ||
                    !patientInfo.height ||
                    !patientInfo.gender ||
                    !patientInfo.temperature ||
                    !patientInfo.weight ||
                    loading
                }
            >
                {loading ? <CircularProgress color="#fff" /> : "Submit"}
            </Button>
        </Layout>
    );
};

export default AddPatientComponent;
