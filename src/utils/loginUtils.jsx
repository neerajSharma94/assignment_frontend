export const getDashboardUrl = (role = "") => {
    let url = "/login";
    if (role === "nurse") {
        url = "/patient/add";
    } else if (role === "doctor") {
        url = "/patients";
    } else if (role === "hospital admin") {
        url = "/staffs";
    } else if (role === "admin") {
        url = "/admin";
    }
    return url;
};

export const axiosConfig = (_url, method = "get", data = {}) => {
    const token = localStorage.getItem("token");
    return {
        method: method,
        url: _url,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data,
    };
};
