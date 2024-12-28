import { Container, CssBaseline, Paper } from "@mui/material";
import React from "react";
import Header from "./Header";

const Layout = ({
    children,
    containerProps = {},
    paperProps = {},
    containerStyleProps = {},
    maxWidth = "sm",
}) => (
    <>
        <CssBaseline />
        <Header />
        <Container
            maxWidth={maxWidth}
            sx={{
                height: "calc(100vh - 80px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...containerStyleProps,
            }}
            {...containerProps}
        >
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    p: "20px",
                    width: "100%",
                    height: "100%",
                    ...paperProps,
                }}
            >
                {children}
            </Paper>
        </Container>
    </>
);

export default Layout;
