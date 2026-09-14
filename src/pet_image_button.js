import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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
        
            >
                <DialogTitle id="alert-dialog-title">
                    {"Pet's image Button"}
                </DialogTitle>
                <DialogContent>
            
                <img
                    style={{ width: 'auto', height: '100%' }}
                    src="./pet_images/ozzy-golden-retriever.jpg"
                    alt="image"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}