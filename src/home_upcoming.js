import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

export default function CurrentPets() {
    const [currentPets, setCurrentPets] = useState([]);

    useEffect(() => {
        ipcRenderer.send('request-upcoming-appt');

        ipcRenderer.on('upcoming-appt-data', (data, event) => {
            console.log('Received upcoming-appt data:', data);

            setCurrentPets(data);
        });

        // Clean up the IPC event listener when the component unmounts
        return () => {
            ipcRenderer.removeListener('upcoming-appt-data');
        };
    }, []);

    return (
        <Box sx={{ height: 600, width: 200, maxWidth: 360 }}>
            <Typography sx={{ fontSize: 25, fontWeight: 'bold', color: '#146eb4', height: 100 }}>
                Upcoming Appointments
            </Typography>
            <List sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                {currentPets.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.appt_data} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};