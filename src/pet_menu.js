import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

export default function BasicMenu({ onSelectPet }) {

    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState('Pet');


    useEffect(() => {
        ipcRenderer.send('request-pet-data');

        // Listen for the response from the main process
        ipcRenderer.on('pet-data-from-database', (data, event) => {
            setPets(data);
            console.log("pettt: ", data)

        });

        // Clean up the event listener when the component unmounts
        return () => {
            ipcRenderer.removeListener('pet-data-from-database');
        };
    }, []); // Empty dependency array to run the effect only once


    const handlePetSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedPet(selectedValue);
        onSelectPet(selectedValue);
    };

    return (
        <TextField
            id="outlined-select-currency-native"
            select
            label="Pet"
            value={selectedPet}
            onChange={handlePetSelect}
            color="secondary"
            SelectProps={{
                native: true,
            }}
            sx={{ m: 1 }}
        >
            {/* Map through the pet array and create options */}
            {pets.map((pet) => (
                <option key={pet.pet_id} value={pet.pet_id}>
                    {`${pet.pet_name}`}
                </option>
            ))}
        </TextField>
    );
}