import { Typography } from "@mui/joy";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { UserContext } from "../../utils/UserContext";
import { axiosConfig, getDashboardUrl } from "../../utils/loginUtils";
import url from "../../utils/urls";

const Login = () => {
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (k, v) => setUserInfo((prev) => ({ ...prev, [k]: v }));
    const handleReset = () => {
        setUserInfo({});
        setLoading(false);
    };

    const handleLogin = async () => {
        try {
            let { username, password } = userInfo;
            if (!username || !password) return;
            setLoading(true);
            let payload = { username, password };
            const config = axiosConfig(url.login_url, "post", payload);
            const res = await axios.request(config);
            if (res.status === 200) {
                const { token, role } = res.data;
                dispatch({
                    type: "LOGIN",
                    payload: { token, role, username },
                });
                localStorage.setItem("token", token);
                handleReset();
                const url = getDashboardUrl(role);
                navigate(url);
            }
        } catch (error) {
            console.log("error from handleLogin", error);
            toast.error(
                error?.response?.data?.message || "Oops! something went wrong."
            );
            handleReset();
        }
    };

    return (
        <Layout paperProps={{ height: 400 }}>
            <Typography level="h2" sx={{ textAlign: "center", mb: "auto" }}>
                Login
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
                onClick={handleLogin}
                disabled={!userInfo.username || !userInfo.password}
                sx={{ mt: "auto" }}
            >
                {loading ? <CircularProgress color="#fff" /> : "Login"}
            </Button>
        </Layout>
    );
};

export default Login;
