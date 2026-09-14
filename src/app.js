import React, { useState } from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ThemeProvider} from '@mui/material/styles';
import { getTheme } from './theme'; // Import getTheme
import Login from './login';
import Home from './home';
import Appointment from './appointment';
import Pet from './pet';
import Customer from './customer';
import Settings from './settings';
import Logout from './logout';

function App() {
    const [mode, setMode] = useState('light');
    const theme = getTheme(mode);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path ="/appointment" element={<Appointment />} />
                    <Route path="/pet" element={<Pet />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/settings" element={<Settings setMode={setMode} />} />
                    <Route path ="main_window" element = {<Login />} />
                    <Route path = "/logout" element = {<Logout />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
