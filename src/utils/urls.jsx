const baseUrl = "http://localhost:8000/api/";

const addHospitalAdmin = `${baseUrl}admin/addHospitalAdmin`;
const addStaffUrl = `${baseUrl}staff`;
const login_url = `${baseUrl}login`;
const get_patientUrl = `${baseUrl}doctor/patients`;
const getMeasurementUrl = `${baseUrl}doctor/patient/measurements`;
const addPatientUrl = `${baseUrl}nurse/addPatient`;
const addPatientMeasurementUrl = `${baseUrl}nurse/addMeasurement`;
const userInfoUrl = `${baseUrl}userInfo`;

const getStaffListUrl = addStaffUrl;

const url = {
    login_url,
    addHospitalAdmin,
    addPatientUrl,
    addPatientMeasurementUrl,
    get_patientUrl,
    getMeasurementUrl,
    addStaffUrl,
    userInfoUrl,
    getStaffListUrl,
};
export default url;
