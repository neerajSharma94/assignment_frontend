import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RoutesComponent from "./routes";
import { UserContext } from "./utils/UserContext";
import { axiosConfig } from "./utils/loginUtils";
import url from "./utils/urls";

function App() {
    const { state, dispatch } = useContext(UserContext);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                const config = axiosConfig(url.userInfoUrl);
                const res = await axios.request(config);
                if (res.status === 200) {
                    dispatch({
                        type: "LOGIN",
                        payload: {
                            token,
                            role: res.data.role,
                            username: res.data.username,
                        },
                    });
                }
                setLoading(false);
            } catch (error) {
                console.log("Oops! something went wrong.", error);
                setLoading(false);
            }
        };
        if (!token || token === "null") {
            navigator("/login");
        } else if (!state.username) {
            fetchUserInfo();
        }
    }, []);

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <RoutesComponent role={state.role} />
            )}
            <ToastContainer />
        </>
    );
}

export default App;
