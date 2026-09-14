import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

export default function EmployeeFormDialog() {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const admin_passkey = 'open';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFirstName('');
        setLastName('');
        setPassword('');
        setPassword2('');
        setAdminPassword('');
    };

    const handleSave = () => {
        console.log('Employee Data:', { firstName, lastName, password, password2, adminPassword });

        const empData = {
            fname: firstName,
            lname: lastName,
            pass: password,
            pass2: password2,
            admpass: adminPassword
        };
        //Send to main process
        ipcRenderer.send('add-emp', empData);
        // Close the dialog after saving (or handling) the data
        handleClose();
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Create Account
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Employee</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Re-enter Password"
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Admin Passkey"
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} disabled={!firstName || !lastName || !password || !(password === password2) || !(adminPassword === admin_passkey)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
