import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

export default function BasicMenu({ onSelectCustomer }) {
	
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('Customer'); 


  useEffect(() => {
    ipcRenderer.send('request-cust-data');

    // Listen for the response from the main process
    ipcRenderer.on('cust-data-from-database', (data, event) => {
     	setCustomers(data);
     	console.log("custtt: ",data)

    });

    // Clean up the event listener when the component unmounts
    return () => {
		ipcRenderer.removeListener('cust-data-from-database');
    };
  }, []); // Empty dependency array to run the effect only once
 
 
  const handleCustomerSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedCustomer(selectedValue);
    onSelectCustomer(selectedValue);
  };
  
  return (
    <TextField
      id="outlined-select-currency-native"
      select
      label="Customer"
      value={selectedCustomer}
      onChange={handleCustomerSelect}
      color="secondary"
      SelectProps={{
        native: true,
      }}
      sx={{ m: 1 }}
    >
      {/* Map through the customers array and create options */}
      {customers.map((customer) => (
        <option key={customer.customer_id} value={customer.customer_id}>
          {`${customer.customer_first} ${customer.customer_last}`}
        </option>
      ))}
    </TextField>
  );
}
