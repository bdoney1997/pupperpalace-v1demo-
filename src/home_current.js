import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

export default function CurrentPets() {
    const [currentPets, setCurrentPets] = useState([]);

    useEffect(() => {
        ipcRenderer.send('request-current-pets');

        ipcRenderer.on('current-pet-data', (data, event) => {
            console.log('Received current-pet data:', data);

            setCurrentPets(data);
        });

        // Clean up the IPC event listener when the component unmounts
        return () => {
            ipcRenderer.removeListener('current-pet-data');
        };
    }, []);

    return (
        <Box sx={{ height: 600, width: 200, maxWidth: 360 }}>
            <Typography sx={{ fontSize: 25, fontWeight: 'bold', color: '#146eb4', height: 100 }}>
                Current Pets and Pickup Date
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