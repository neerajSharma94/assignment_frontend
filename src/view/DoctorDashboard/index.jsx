import { Typography } from "@mui/joy";
import { Box, CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { UserContext } from "../../utils/UserContext";
import { axiosConfig, getDashboardUrl } from "../../utils/loginUtils";
import url from "../../utils/urls";
import HeartRateChart from "./HeartRateChart";
import Patients from "./Patients";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const centerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
};

const DoctorDashboard = () => {
    const navigator = useNavigate();
    const { state } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [patientDetails, setPatientDetails] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleModal = async (patientId) => {
        try {
            setLoading(true);
            setOpen(true);
            const config = axiosConfig(`${url.getMeasurementUrl}/${patientId}`);
            const res = await axios.request(config);
            setMeasurements({ patientId, data: res.data || [] });
            setLoading(false);
        } catch (error) {
            console.log("error from handleModal,", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                const config = axiosConfig(url.get_patientUrl);
                const res = await axios.request(config);
                setPatientDetails(res.data || []);
                setLoading(false);
            } catch (error) {
                console.log("getting error from fetchPatients", error);
                setLoading(false);
            }
        };
        if (!["doctor", "nurse"].includes(state.role)) {
            const url = getDashboardUrl(state.role);
            navigator(url);
        } else {
            fetchPatients();
        }
    }, []);

    return (
        <Layout maxWidth="lg">
            <Typography level="h2" sx={{ mb: 2 }}>
                Patients
            </Typography>
            <Patients
                rows={patientDetails}
                handleModal={handleModal}
                role={state.role}
            />
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    {loading ? (
                        <Box sx={centerStyle}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <HeartRateChart measurements={measurements} />
                    )}
                </Box>
            </Modal>
        </Layout>
    );
};

export default DoctorDashboard;
