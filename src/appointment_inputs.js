import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Technician_menu from './technician_menu';
import Customer_menu from './customer_menu';
import Pet_menu from './pet_menu';
import DatePicker from './date_picker';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook
import theme from './theme';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let buttonState = 0;

export default function FormDialog() {
    const theme = useTheme(); // Access the Material-UI theme

    const [open, setOpen] = React.useState(false);
    const [selectedTechnician, setSelectedTechnician] = React.useState('Technician');
    const [selectedCustomer, setSelectedCustomer] = React.useState('Customer');
    const [selectedPet, setSelectedPet] = React.useState('Pet');
    const [reasonForVisit, setReasonForVisit] = React.useState(null);
    const [checkInDateTime, setCheckInDateTime] = React.useState(null);
    const [checkOutDateTime, setCheckOutDateTime] = React.useState(null);
    const [openAlt, setOpenAlt] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

        setReasonForVisit(null);
        setCheckInDateTime(null);
        setCheckOutDateTime(null);
        buttonState = 0;
    };

    const handleSave = () => {
        setOpenAlt(true);
        while (checkInDateTime === null || checkOutDateTime === null) {
            // Check if checkInDateTime is null, and if it is, show an error message
            alert('Please select a check-in and check-out date and time.');
        }

        // Gather data to send back to the main process
        const apptData = {
            technician: selectedTechnician,
            customer: selectedCustomer,
            pet: selectedPet,
            notes: reasonForVisit !== null ? reasonForVisit : "N/A",
            check_in: getDate(checkInDateTime),
            check_out: getDate(checkOutDateTime)
        };
        //Send to main process
        ipcRenderer.send('add-appt', apptData);
        buttonState++;
        //handleClose(); // Close the dialog
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlt(false);
    };

    const handleTechnicianSelect = (technician) => {
        setSelectedTechnician(technician);
    };

    const getDate = (date) => {
        const year = date.$y;
        const month = date.$M;
        const day = date.$D;
        const hours = date.$H;
        const minutes = date.$m;

        // Create a new JavaScript Date object with the extracted components
        const newDate = new Date(year, month, day, hours, minutes);
        return newDate;
    }

    const handleCustomerSelect = (customer) => {
        setSelectedCustomer(customer);
    };

    const handlePetSelect = (pet) => {
        setSelectedPet(pet);
    };

    /* Removed Insurance Field
             <TextField sx={{m:1, pb:1}}
              autoFocus
              margin="normal"
              id="name"
              label="Insurance"
              type="name"
              color="secondary"
              variant="standard"
            />
            */

    return (
        <div style={{ position: 'absolute', top: '-2px', right: '-235px' }}>
            <Button size="large"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
                sx={{
                    bgcolor: theme.palette.secondary.dark,
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover': {
                        bgcolor: theme.palette.secondary.extraLight,
                    },
                }}
            >
                Appointment
            </Button>
            <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: "100%" } }}>
                <DialogTitle sx={{ bgcolor: 'secondary', color: 'secondary' }}>Schedule an Appointment</DialogTitle>
                <DialogContent>

                    <Customer_menu onSelectCustomer={handleCustomerSelect} />
                    <Pet_menu onSelectPet={handlePetSelect} />
                    <Technician_menu onSelectTechnician={handleTechnicianSelect} />
                    <TextField
                        //sx={{ m: 1, pb: 3, display: 'block' }}
                        autoFocus
                        margin="normal"
                        id="outlined-multiline-static"
                        multiline
                        maxRows={4}
                        label="Reason for Visit"
                        type="name"
                        color="secondary"
                        variant="standard"
                        fullWidth
                        value={reasonForVisit}
                        onChange={(e) => setReasonForVisit(e.target.value)}
                    />

                    <Divider sx={{ pt: 3 }} />
                    <DialogContent></DialogContent>
                    <div style={{ marginLeft: '9px' }}>
                        <DatePicker
                            checkInDateTime={checkInDateTime}
                            setCheckInDateTime={setCheckInDateTime}
                            checkOutDateTime={checkOutDateTime}
                            setCheckOutDateTime={setCheckOutDateTime}
                        />
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Exit</Button>
                    <Button
                        onClick={handleSave}
                        disabled={checkInDateTime === null || checkOutDateTime === null || buttonState > 0}>
                        Save
                    </Button>
                    <Snackbar open={openAlt} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                            Appointment Successfully Saved
                        </Alert>
                    </Snackbar>
                </DialogActions>
            </Dialog>
        </div>
    );
}