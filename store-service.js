const fs = require('fs');
const path = require('path');

// Arrays to hold items and categories
let items = [];
let categories = [];

// Helper function to read a JSON file and parse it
function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`unable to read file: ${filePath}`);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Function to initialize the service by loading items and categories
function initialize() {
    return new Promise((resolve, reject) => {
        readJsonFile(path.join(__dirname, 'data/items.json'))
            .then((parsedItems) => {
                items = parsedItems;
                return readJsonFile(path.join(__dirname, 'data/categories.json'));
            })
            .then((parsedCategories) => {
                categories = parsedCategories;
                resolve('Initialization successful');
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// Function to get all items
function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length > 0) {
            resolve(items);
        } else {
            reject('no results returned');
        }
    });
}

// Function to get published items
function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published === true);
        if (publishedItems.length > 0) {
            resolve(publishedItems);
        } else {
            reject('no results returned');
        }
    });
}

// Function to get all categories
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length > 0) {
            resolve(categories);
        } else {
            reject('no results returned');
        }
    });
}

// Export functions for external use
module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories
};
