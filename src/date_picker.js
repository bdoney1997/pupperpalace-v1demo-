//Date Picker
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
 
export default function DatePicker({
  checkInDateTime,
  setCheckInDateTime,
  checkOutDateTime,
  setCheckOutDateTime,
}) {
const handleCheckInChange = (dateObject) => {

  setCheckInDateTime(dateObject);
};
 
  const handleCheckOutChange = (date) => {
    setCheckOutDateTime(date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        sx={{ mr: 1 }}
        label="Check In"
        value={checkInDateTime}
        onChange={handleCheckInChange}
      />
      <DateTimePicker
        sx={{ ml: 1 }}
        label="Check Out"
        value={checkOutDateTime}
        onChange={handleCheckOutChange}
      />
    </LocalizationProvider>
  );
}