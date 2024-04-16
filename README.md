# Themtfy
Themtfy is a lightweight JavaScript library for displaying toast notifications on web pages. It allows you to easily create customizable toast messages with various configuration options.

## Features

- Create toast notifications with custom titles and body text.
- Choose from different icon styles for your notifications.
- Customize the position and appearance of toast notifications.
- Automatically close notifications after a specified time.
- Allow users to close notifications manually.

## Installation

You can install Themtfy via npm:

npm install themtfy


Or include the script directly in your HTML file:

<script src="path/to/themtfy.js"></script>

// Import Themtfy class
import Themtfy from 'themtfy';
import "path/to/themtfy/dist/style.css";

// Create a new instance of Themtfy
const toast = new Themtfy({options});


// Options:
    position: "top-right", //default
    title: "Your title goes here",//default
    body: "Your text goes here.", //default
    icon: "default", "success", "warning", "error", "info"
    variation: "default", "success", "warning", "error", "info"
    autoClose: 1000, //time in ms
    onClose: () => {},
    canClose: true, //default
    showProgress: true, //default

    all positions values: "top-right", "top-center", "top-left", "center-right", "center-center", "center-left", "bottom-right", "bottom-center", "bottom-left"