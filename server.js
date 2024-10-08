const express = require('express');
const path = require('path');
const storeService = require('./store-service');

const app = express();
const PORT = 8080;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route for the shop page
app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

// Route for items
app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

// Route for categories
app.get('/categories', (req, res) => {
    storeService.getCategories()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

// Custom 404 page for unmatched routes
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Initialize data and start the server
storeService.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
