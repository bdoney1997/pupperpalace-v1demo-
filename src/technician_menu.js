import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

export default function BasicMenu({ onSelectTechnician }) {
	
  // Define state to store the technician data
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState('Technician'); 


  useEffect(() => {
    // Send request to the main process to get employee data
    ipcRenderer.send('request-employee-data');

    // Listen for the response from the main process
    ipcRenderer.on('employee-data', (data, event) => {
      // Update the state with the received employee data
     	setTechnicians(data);

    });

    // Clean up the event listener when the component unmounts
    return () => {
		ipcRenderer.removeListener('employee-data');
    };
  }, []); // Empty dependency array to run the effect only once
 
 
  // Handle technician selection
  const handleTechnicianSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedTechnician(selectedValue);
    onSelectTechnician(selectedValue); // Pass the selected technician
  };
  
  return (
    <TextField
      id="outlined-select-currency-native"
      select
      label="Technician"
      value={selectedTechnician}
      onChange={handleTechnicianSelect}
      color="secondary"
      SelectProps={{
        native: true,
      }}
      sx={{ m: 1 }}
    >
      {/* Map through the technicians array and create options */}
      {technicians.map((technician) => (
        <option key={technician.employee_first} value={technician.employee_id}>
          {`${technician.employee_first} ${technician.employee_last}`}
        </option>
      ))}
    </TextField>
  );
}
