import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Technician_menu from './technician_menu';
import DatePicker from './date_picker';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  


  return (
    <div>
      <Button size="large" variant="contained" endIcon={<AddIcon />} onClick={handleClickOpen} color="secondary">
        Payment Information
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{sx:{width:"100%"}}}>
        <DialogTitle sx={{bgcolor:'#ff1744', color:'white'}}>Enter here:</DialogTitle>
        
        <DialogContent>
          <TextField sx={{m:1}}
            autoFocus
            margin="normal"
            id="name"
            label="Full Name"
            type="name"
            color="secondary"
            variant="standard"
            fullWidth
          />
          <TextField sx={{m:1, pb:1}}
            autoFocus
            margin="normal"
            id="cnumber"
            label="Card Number"
            type="name"
            color="secondary"
            variant="standard"
          />
          <TextField sx={{ m: 1, pb: 1 }}
            autoFocus
            margin="normal"
            id="address"
            label="Address"
            type="name"
            color="secondary"
            variant="standard"
          />

          <TextField sx={{m:1, pb:1}}
            autoFocus
            margin="normal"
            label="4 digits on back"
            type="name"
            color="secondary"
            variant="standard"
          />
          <Technician_menu />
          <Divider sx={{pt:1}} />
          <DialogContent></DialogContent>
          <DatePicker />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}