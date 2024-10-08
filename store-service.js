const fs = require('fs');
const path = require('path');

const itemsFilePath = path.join(__dirname, '/data/items.json');
const categoriesFilePath = path.join(__dirname, '/data/categories.json');

// Function to get all items
const getAllItems = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(itemsFilePath, 'utf-8', (err, data) => {
            if (err) {
                reject("Error reading items.json");
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

// Function to get all categories
const getAllCategories = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(categoriesFilePath, 'utf-8', (err, data) => {
            if (err) {
                reject("Error reading categories.json");
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

// Export the functions to be used in server.js
module.exports = {
    getAllItems,
    getAllCategories
};