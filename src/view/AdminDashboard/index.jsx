import { Typography } from "@mui/joy";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { UserContext } from "../../utils/UserContext";
import { axiosConfig, getDashboardUrl } from "../../utils/loginUtils";
import url from "../../utils/urls";

const AdminDashboard = () => {
    const navigator = useNavigate();
    const { state } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (k, v) => setUserInfo((prev) => ({ ...prev, [k]: v }));

    const handleReset = () => {
        setLoading(false);
        setMeasurement({});
    };
    const handleSubmit = async () => {
        try {
            const { username, password } = measurement;
            if (!username || !password) return;
            setLoading(true);
            const payload = {
                username,
                password,
            };
            const config = axiosConfig(url.addHospitalAdmin, "post", payload);
            const res = await axios.request(config);
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
        if (!["admin"].includes(state.role)) {
            const url = getDashboardUrl(state.role);
            navigator(url);
        }
    }, []);
    return (
        <Layout paperProps={{ height: 400 }}>
            <Typography level="h2" sx={{ textAlign: "center", mb: "auto" }}>
                Create Hospital admin
            </Typography>
            <TextField
                id="user_name"
                label="Username"
                variant="outlined"
                value={userInfo.username || ""}
                onChange={(e) => handleChange("username", e.target.value)}
            />
            <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                value={userInfo.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: "auto" }}
                disabled={!userInfo.username || !userInfo.password || loading}
            >
                {loading ? <CircularProgress color="#fff" /> : "Submit"}
            </Button>
        </Layout>
    );
};

export default AdminDashboard;
