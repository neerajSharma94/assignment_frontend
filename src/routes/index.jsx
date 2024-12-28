import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../view/AdminDashboard";
import DoctorDashboard from "../view/DoctorDashboard";
import HospitalAdminDashboard from "../view/HospitalAdmin";
import AddMeasurements from "../view/NurseDashboard/AddMeasurements";
import AddPatientComponent from "../view/NurseDashboard/AddPatientComponent";
import Login from "../view/login";
import StaffComponent from "../view/staff";

const RoutesComponent = ({ role }) => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            {role && (
                <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route
                        path="/add-staff"
                        element={<HospitalAdminDashboard />}
                    />
                    <Route path="/staffs" element={<StaffComponent />} />
                    <Route path="/patients" element={<DoctorDashboard />} />
                    <Route
                        path="/patient/add"
                        element={<AddPatientComponent />}
                    />
                    <Route
                        path="/patient/measurement"
                        element={<AddMeasurements />}
                    />
                </>
            )}
            <Route path="*" element={<Login />} />
        </Routes>
    );
};

export default RoutesComponent;
