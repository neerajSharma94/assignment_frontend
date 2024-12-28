import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

const headerStyle = {
    position: "sticky",
    top: 0,
    backgroundColor: "background.paper",
    zIndex: 1,
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
};
const menuStyle = {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
    },
};
const Header = () => {
    const navigator = useNavigate();
    const { state, dispatch } = useContext(UserContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleNavigation = (url) => {
        navigator(url, { replace: true });
    };

    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.setItem("token", null);
        dispatch({ type: "LOGOUT" });
        navigator("/login");
    };

    return (
        <Box sx={headerStyle}>
            {state.role === "nurse" && (
                <>
                    <Button onClick={() => handleNavigation("/patient/add")}>
                        Add Patient
                    </Button>
                    <Button
                        onClick={() => handleNavigation("/patient/measurement")}
                    >
                        Measurements
                    </Button>
                    <Button onClick={() => handleNavigation("/patients")}>
                        Patients
                    </Button>
                </>
            )}
            {["hospital admin", "admin"].includes(state.role) && (
                <>
                    <Button onClick={() => handleNavigation("/add-staff")}>
                        Add Staff
                    </Button>
                    <Button onClick={() => handleNavigation("/staffs")}>
                        Staffs
                    </Button>
                </>
            )}
            <Tooltip title="">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 1 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {state.username ? state.username[0].toUpperCase() : ""}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: menuStyle,
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem disabled>{`${state.username || ""}(${
                    state.role || ""
                })`}</MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Header;
