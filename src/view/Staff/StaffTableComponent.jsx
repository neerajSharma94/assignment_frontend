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

const StaffTableComponent = ({ staffList = [] }) => {
    console.log("staffList", staffList);
    return (
        <TableContainer>
            <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label="simple table"
            >
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="left">User ID</StyledTableCell>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell align="center">Role</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {staffList.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="left"
                            >
                                {row._id}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.username}
                            </StyledTableCell>

                            <StyledTableCell
                                align="center"
                                sx={{ textTransform: "capitalize" }}
                            >
                                {row.role}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StaffTableComponent;
