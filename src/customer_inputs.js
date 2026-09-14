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
import Grid from '@mui/material/Grid';
//import Divider from '@mui/material/Divider';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let buttonState = 0;

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [openAlt, setOpenAlt] = React.useState(false);
    const [customerFirst, setCustomerFirst] = React.useState(null);
    const [customerLast, setCustomerLast] = React.useState(null);
    const [customerPhone, setCustomerPhone] = React.useState(null);
    const [isPhoneValid, setIsPhoneValid] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //reset all the fields that were previously filled in

        setCustomerFirst(null);
        setCustomerLast(null);
        setCustomerPhone(null);
        setIsPhoneValid(true);
        buttonState = 0;
    };


    const handlePhoneChange = (e) => {
        let phoneValue = e.target.value;

        phoneValue = phoneValue.replace(/\D/g, '');

        if (phoneValue.length <= 10) {
            phoneValue = `(${phoneValue.slice(0, 3)})-${phoneValue.slice(3, 6)}-${phoneValue.slice(6, 10)}`;
        }
        setCustomerPhone(phoneValue);
        setIsPhoneValid(phoneValue.length === 10)
    };

    const handleSave = () => {
        setOpenAlt(true);
        const custData = {
            fname: customerFirst,
            lname: customerLast,
            phone: customerPhone
        };
        //Send to main process
        ipcRenderer.send('add-cust', custData);
        buttonState = 1;
        //handleClose(); // Close the dialog
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlt(false);
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
                Customer
            </Button>
            <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: "100%" } }}>
                <DialogTitle sx={{ bgcolor: 'secondary', color: 'secondary' }}>Add Customer</DialogTitle>
                <DialogContent>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                id="First Name"
                                label="First Name"
                                name="First Name"
                                autoComplete="First Name"
                                value={customerFirst}
                                onChange={(e) => setCustomerFirst(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                id="Last Name"
                                label="Last Name"
                                name="Last Name"
                                autoComplete="Last Name"
                                value={customerLast} // using the state variable
                                onChange={(e) => setCustomerLast(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <TextField
                        //phone number
                        //sx={{ m: 1, pb: 3 }}
                        autoFocus
                        required
                        margin="normal"
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        color="secondary"
                        variant="standard"
                        fullWidth
                        value={customerPhone}
                        //onChange={(e) => setCustomerPhone(e.target.value)
                        onChange={handlePhoneChange}
                        error={!isPhoneValid}
                        helperText={!isPhoneValid ? 'Please enter a valid phone number (digits only)' : ''}
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Exit</Button>
                    <Button onClick={handleSave}
                        disabled={customerFirst === null || customerLast === null || customerPhone === null || buttonState === 1}>
                        Save
                    </Button>
                    <Snackbar open={openAlt} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                            Customer Successfully Saved
                        </Alert>
                    </Snackbar>
                </DialogActions>
            </Dialog>
        </div>
    );
}
