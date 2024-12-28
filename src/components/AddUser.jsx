import { Button, TextField } from "@mui/material";
import React from "react";

const AddUser = ({ heading = "", btnText = "Submit" }) => {
    return (
        <>
            <Typography level="h2" sx={{ textAlign: "center", mb: "auto" }}>
                {heading}
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
                value={userInfo.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
            />
            <Button
                variant="contained"
                onClick={handleLogin}
                sx={{ mt: "auto" }}
            >
                {btnText}
            </Button>
        </>
    );
};

export default AddUser;
