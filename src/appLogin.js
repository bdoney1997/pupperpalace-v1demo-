import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@fontsource/public-sans';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import Appointment from './appointment';
import Login from './login';
import Table from './table';

const container = document.getElementById('appLogin');;

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
    <Appointment />
    //<Login />
    //<Table />
);
