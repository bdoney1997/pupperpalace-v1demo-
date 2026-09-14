import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook
//import { getTheme } from './theme'; // Import getTheme
import InputMask from 'react-text-mask';
import Button from '@mui/material/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



// CSS for the hover effect
const hoverEffectStyle = {
  '.contact-info-hidden': {
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '.contact-info-hidden:hover': {
    opacity: 1,
  },
};


const columns = (iconState, setIconState, handleStatusChange, opacityState, toggleOpacity) => [
  { field: 'id',
    headerClassName: 'appointment_header',
    headerName: 'ID', 
    width: 100 },
  { field: 'res', 
    headerClassName: 'appointment_header',
    headerName: 'Reservation', 
    width: 350 },
  {
    field: 'pet',
    headerClassName: 'appointment_header',
    headerName: 'Pet Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150
  },
  {
    field: 'owner',
    headerClassName: 'appointment_header',
    headerName: 'Owner',
    width: 170,
    editable: true,
  },
  {
    field: 'checkin',
    headerClassName: 'appointment_header',
    headerName: 'Checked-In By',
    width: 170,
    editable: true,
  },
  {
    field: 'phone',
  headerClassName: 'appointment_header',
  headerName: 'Contact info',
  width: 150,
  renderCell: (params) => (
    <div style={{ opacity: opacityState }}>{params.value}</div>
  ),
  },
  {
    field: 'status',
    headerClassName: 'appointment_header',
    headerName: 'Status',
    width: 160,
    editable: true,
    renderCell: (params) => (
      <Select
        value={params.row.status}
        onChange={(e) => handleStatusChange(e, params.id)}
        fullWidth
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Checked-In">Checked In</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
      </Select>
    )
  },
];
  
 
const timestampToDate = timestamp => {
 
// Create a Date object
const date = new Date(timestamp);
 
// Create an array of month names
const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
 
// Get the day, month, year, hours, and minutes
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
//const hours = date.getHours().toString().padStart(2, '0');
//const minutes = date.getMinutes().toString().padStart(2, '0');
 
// Create the formatted date string
const formattedDate = `${date.toString().split(' ')[0]} ${month} ${day} ${year} `;
 
return formattedDate;
}
 //        id: item.appt_number,

 
export default function DataGridDemo() {
  const [iconState, setIconState] = React.useState({});
  const [rows, setRows] = useState([]); //Define the rows state
  const [opacityState, setOpacityState] = useState(0); // State to track opacity

  const toggleOpacity = () => {
    setOpacityState(opacityState === 0 ? 1 : 0); // Toggle opacity between 0 and 1
  };

  const theme = useTheme(); // Access the Material-UI theme

  const tableStyle = {
    height: 650,
    width: '100%',
    '& .appointment_header': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    },
    '& .MuiDataGrid-row': {
      '&:nth-child(odd)': {
        backgroundColor: theme.palette.secondary.light, // Adjust this color for odd rows
        color: theme.palette.secondary.contrastTextDark,  // // Adjust this color for odd rows
      },
      '&:nth-child(even)': {
        backgroundColor: theme.palette.secondary.accent, // Adjust this color for even rows
        color: theme.palette.secondary.contrastTextDark,  // Adjust this color for even rows
      },
      //'&:hover': {
        //backgroundColor: theme.palette.primary.main, // Adjust this color for the hover effect
        //color: theme.palette.common.white,          // Adjust this color for the text on hover
    //},
  },
  };

  useEffect(() => {
    ipcRenderer.send('request-appt-data');
 
 	ipcRenderer.on('appt-data-from-database', (data, event) => {
      console.log('Received appt data:', data); // Add this line to log the received data
 
       const mappedData = data.map((item, index) => ({
        id: item.appt_number,
        res: `${timestampToDate(item.check_in)} - ${timestampToDate(item.check_out)}`,
        pet: item.pet_name,
        owner: `${item.customer_first} ${item.customer_last}`,
        checkin: `${item.employee_first} ${item.employee_last}`,
        phone: item.customer_phone,
        //creater: ,
        status: item.status,
        completedOrder: true
 
      }));
 
      setRows(mappedData);
    });
 
    // Clean up the IPC event listener when the component unmounts
    return () => {
    ipcRenderer.removeListener('appt-data-from-database');    
    };
  }, [setIconState]);
 
  React.useEffect(() => {
    const initialIconState = {};
    rows.forEach((row) => {
      initialIconState[row.id] = row.completedOrder || false;
    });
    setIconState(initialIconState);
  }, [rows, setIconState]); // Add rows and setIconState to the dependency array
  
  
  
 const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, status: newStatus };
        }
        return row;
      });
    ipcRenderer.send('update-appointment-status', { id, status: newStatus });
      return updatedRows;
    });
  };

  

  return (
    <Box sx={tableStyle}>
      <DataGrid
        rows={rows}
        columns={columns(iconState, setIconState, handleStatusChange, opacityState, toggleOpacity)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        isCellEditable={(params) => params.field === 'status'}
      />
       <div style={{ position: 'absolute', top: '-15px', left: '2px' }}>
      <Button size = "large" 
        startIcon = {<VisibilityOffIcon />}
        variant="contained"   
        sx={{ 
          bgcolor: theme.palette.secondary.dark, 
          transition: 'background-color 0.3s ease-in-out',
          '&:hover': {
            bgcolor: theme.palette.secondary.extraLight,
          }, 
        }}
        onClick={toggleOpacity}>
        Hide Contacts
      </Button>
      </div>
    </Box>
  );
      }
