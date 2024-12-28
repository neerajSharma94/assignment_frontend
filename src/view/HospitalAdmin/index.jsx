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

const HospitalAdminDashboard = () => {
    const navigator = useNavigate();
    const { state } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const handleReset = () => {
        setLoading(false);
        setUserInfo({});
    };
    const handleChange = (k, v) => setUserInfo((prev) => ({ ...prev, [k]: v }));
    const handleSubmit = async () => {
        try {
            let { username, password, role } = userInfo;
            if (!username || !password || !role) return;
            setLoading(true);
            let payload = { username, password, role };
            const config = axiosConfig(url.addStaffUrl, "post", payload);
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
        if (!["admin", "hospital admin"].includes(state.role)) {
            const url = getDashboardUrl(state.role);
            navigator(url);
        }
    }, []);

    console.log(userInfo);
    return (
        <Layout paperProps={{ height: 400 }}>
            <Typography level="h2" sx={{ textAlign: "center", mb: "auto" }}>
                Add Staff
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
            <FormControl fullWidth>
                <InputLabel id="role_label">Role</InputLabel>
                <Select
                    labelId="role_label"
                    id="role_label"
                    value={userInfo.role || ""}
                    label="Role"
                    onChange={(e) => handleChange("role", e.target.value)}
                >
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="nurse">Nurse</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={
                    !userInfo.username ||
                    !userInfo.password ||
                    !userInfo.role ||
                    loading
                }
                sx={{ mt: "auto" }}
            >
                {loading ? <CircularProgress color="#fff" /> : "Submit"}
            </Button>
        </Layout>
    );
};

export default HospitalAdminDashboard;
