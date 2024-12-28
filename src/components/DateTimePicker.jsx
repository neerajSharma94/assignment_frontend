import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import * as React from "react";

export default function DateTimePickerValue({
    label = "Timestamp",
    value,
    handleChange,
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <DateTimePicker
                    label={label}
                    value={value}
                    onChange={(newValue) =>
                        handleChange(label?.toLowerCase(), newValue)
                    }
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
