import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const Patients = ({ rows, handleModal }) => {
    return (
        <TableContainer>
            <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label="simple table"
            >
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">
                            Patient ID
                        </StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="center">Age</StyledTableCell>
                        <StyledTableCell align="center">Gender</StyledTableCell>
                        <StyledTableCell align="center">Height</StyledTableCell>
                        <StyledTableCell align="center">
                            Temperature
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            HeartRate
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            Created On
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.patientId}>
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.patientId}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.age}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.gender}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.height}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.temperature}
                            </StyledTableCell>

                            <StyledTableCell
                                align="center"
                                onClick={() => handleModal(row.patientId)}
                                sx={{ cursor: "pointer" }}
                            >
                                <VisibilityIcon />
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.timestamp}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Patients;
