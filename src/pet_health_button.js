import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function EditableDialog() {
    const [open, setOpen] = React.useState(false);
    const [notes, setNotes] = React.useState("Enter important details of the pet's health!\n(Vaccination, disease, etc...)");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        console.log("Saved notes:", notes);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                View
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xl"  // set the size of the dialog box window
                width= "80%"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Pet's Health Notes"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        rows={10}
                        fullWidth
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave} autoFocus>
                        Save
                    </Button>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
