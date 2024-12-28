import { Typography } from "@mui/joy";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { UserContext } from "../../utils/UserContext";
import { axiosConfig, getDashboardUrl } from "../../utils/loginUtils";
import url from "../../utils/urls";
import StaffTableComponent from "./StaffTableComponent";

const StaffComponent = () => {
    const navigator = useNavigate();
    const [loading, setLoading] = useState(false);
    const [staffList, setStaffList] = useState([]);
    const { state } = useContext(UserContext);
    useEffect(() => {
        const fetchStaffList = async () => {
            try {
                setLoading(true);
                const config = axiosConfig(url.getStaffListUrl);
                const res = await axios.request(config);
                if (res.status === 200) {
                    setStaffList(res.data || []);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
                toast.error("Oops! something went wrong.");
            }
        };
        if (!["admin", "hospital admin"].includes(state.role)) {
            const url = getDashboardUrl(state.role);
            navigator(url);
        } else {
            fetchStaffList();
        }
    }, []);

    return (
        <Layout maxWidth="md">
            <Typography level="h2" sx={{ mb: 2 }}>
                Staffs
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {loading ? (
                    <CircularProgress color="#fff" />
                ) : (
                    <StaffTableComponent staffList={staffList} />
                )}
            </Box>
        </Layout>
    );
};

export default StaffComponent;
