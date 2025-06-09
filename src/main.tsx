/**
 * Application entry point
 * Initializes the React application and mounts it to the DOM
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get the root element
const container = document.getElementById("root");

// Ensure root element exists
if (!container) {
  throw new Error("Root element '#root' not found in the DOM. Please ensure the element exists in your HTML.");
}

// Create root and render application
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
