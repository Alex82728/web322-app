const express = require('express');
const storeService = require('./store-service');
const app = express();
const port = 8080;

// Middleware to serve static files from the public folder
app.use(express.static('public'));

// Define routes

// Route to get all published items
app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then(items => {
            // Return the items as JSON
            res.json(items);
        })
        .catch(err => {
            // If there is an error, return an error message as a JSON object
            res.status(500).json({ message: err });
        });
});

// Route to get all items
app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then(items => {
            // Return the items as JSON
            res.json(items);
        })
        .catch(err => {
            // If there is an error, return an error message as a JSON object
            res.status(500).json({ message: err });
        });
});

// Route to get all categories
app.get('/categories', (req, res) => {
    storeService.getCategories()
        .then(categories => {
            // Return the categories as JSON
            res.json(categories);
        })
        .catch(err => {
            // If there is an error, return an error message as a JSON object
            res.status(500).json({ message: err });
        });
});

// 404 Error Handling for unmatched routes
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize the store service and only start the server if the initialization is successful
storeService.initialize()
    .then(() => {
        // If initialization is successful, start the server
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        // If initialization fails, log the error and do not start the server
        console.error(`Failed to initialize store service: ${err}`);
    });
