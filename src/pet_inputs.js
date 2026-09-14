import * as React from 'react';
import react, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Customer_menu from './customer_menu';
import Grid from '@mui/material/Grid';
//import Divider from '@mui/material/Divider';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let buttonState = 0;

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [openAlt, setOpenAlt] = React.useState(false);
    const [selectedCustomer, setSelectedCustomer] = React.useState('Customer');
    const [petName, setPetName] = React.useState(null);
    const [petBreed, setPetBreed] = React.useState(null);
    const [petHealth, setPetHealth] = React.useState(null);
    const [petSex, setPetSex] = React.useState(null);
    const [petAge, setPetAge] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //reset all the fields that were previously filled in

        setPetName(null);
        setPetBreed(null);
        setPetHealth(null);
        setPetSex(null);
        setPetAge(null);
        buttonState = 0;
    };

    const handleSave = () => {
        setOpenAlt(true);
        const petData = {
            petName: petName,
            petBreed: petBreed,
            petHealth: petHealth,
            petSex: petSex,
            petOwner: selectedCustomer,
            petAge: petAge
        };

        //Send to main process
        ipcRenderer.send('add-pet', petData);
        buttonState++;
        //handleClose(); // Close the dialog
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlt(false);
    };

    const handleCustomerSelect = (petOwner) => {
        setSelectedCustomer(petOwner);
    };

    return (
        <div>
            <Button size="large" variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen} color="secondary"
                sx={{
                    backgroundColor: 'secondary.dark',
                    color: 'secondary.contrastText',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover': {
                        bgcolor: 'secondary.extraLight',
                    },
                }}
            >
                Pet
            </Button>
            <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: '100%' } }}>
                <DialogTitle sx={{ bgcolor: 'secondary', color: 'secondary' }}>New Pet</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                id="Pet Name"
                                label="Pet Name"
                                name="Pet Name"
                                autoComplete="Pet Name"
                                value={petName}
                                onChange={(e) => setPetName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: '8px' }}>
                            <Customer_menu onSelectCustomer={handleCustomerSelect} />
                        </Grid>
                    </Grid>


                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                //sx={{ width: '80%' }}
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                id="Pet Breed"
                                label="Pet Breed"
                                name="Pet Breed"
                                autoComplete="Pet Breed"
                                value={petBreed}
                                onChange={(e) => setPetBreed(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                //sx={{ width: '80%' }}
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                id="Pet Sex"
                                label="Sex"
                                name="Sex"
                                autoComplete="Sex"
                                value={petSex}
                                onChange={(e) => setPetSex(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                //sx={{ width: '80%' }}
                                autoFocus
                                margin="normal"
                                required
                                id="Age"
                                label="Age"
                                name="Age"
                                autoComplete="Age"
                                value={petAge}
                                onChange={(e) => setPetAge(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        sx={{ m: 1, pb: 3 }}
                        autoFocus
                        margin="normal"
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={4}
                        label="Pet Health Notes"
                        type="text"
                        color="secondary"
                        variant="standard"
                        fullWidth
                        value={petHealth}
                        onChange={(e) => setPetHealth(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSave}
                        disabled={petName === null || petBreed === null || petSex === null || buttonState > 0}
                    >
                        Save
                    </Button>
                    <Snackbar open={openAlt} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                            Pet Successfully Saved
                        </Alert>
                    </Snackbar>
                </DialogActions>
            </Dialog>
        </div>
    );
}