const express = require('express');
const app = express();
const storeService = require('./store-service');


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/about');
});


app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});


app.get('/shop', (req, res) => {
    storeService.getAllItems().then(items => {
        const publishedItems = items.filter(item => item.published === true);
        res.json(publishedItems);  
    }).catch(err => {
        res.status(500).send("Unable to fetch published items.");
    });
});


app.get('/items', (req, res) => {
    storeService.getAllItems().then(items => {
        res.json(items);  
    }).catch(err => {
        res.status(500).send("Unable to fetch items.");
    });
});


app.get('/categories', (req, res) => {
    storeService.getAllCategories().then(categories => {
        res.json(categories);  
    }).catch(err => {
        res.status(500).send("Unable to fetch categories.");
    });
});

app.get('*', (req, res) => {
    res.status(404).send("Page Not Found");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Express http server listening on port ${PORT}`);
});
