const fs = require('fs');
let items = [];
let categories = [];

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/items.json', 'utf8', (err, data) => {
            if (err) {
                reject("unable to read items file");
                return;
            }

            items = JSON.parse(data);

            fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                if (err) {
                    reject("unable to read categories file");
                    return;
                }

                categories = JSON.parse(data);
                resolve();
            });
        });
    });
};

module.exports.getAllItems = () => {
    return new Promise((resolve, reject) => {
        if (items.length === 0) {
            reject("no results returned");
            return;
        }
        resolve(items);
    });
};

module.exports.getPublishedItems = () => {
    return new Promise((resolve, reject) => {
        let publishedItems = items.filter(item => item.published);
        if (publishedItems.length === 0) {
            reject("no results returned");
            return;
        }
        resolve(publishedItems);
    });
};

module.exports.getCategories = () => {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("no results returned");
            return;
        }
        resolve(categories);
    });
};
