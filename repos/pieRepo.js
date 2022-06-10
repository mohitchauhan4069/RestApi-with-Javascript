const { getFips } = require('crypto');
const { json } = require('express');
let fs = require('fs');
const FILE_NAME = './assets/pies.json';
let pieRepo = {
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        })

    },
    //get data by ID 
    getByID: function(id, resolve, reject) {

        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let pie = JSON.parse(data).find(p => p.id == id);
                resolve(pie);
            }
        });
    },
    //add data by id
    insert: function(newData, cb) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                cb(err, undefined)
            } else {
                let pies = JSON.parse(data.toString());
                pies.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err) {
                    if (err) {
                        cb(err, undefined)
                    } else {
                        cb(undefined, newData)
                    }
                })
            }
        })
    },

    delete: function(Data, id) {
        console.log(`this is my id :`, id)
        fs.readFile(FILE_NAME, function(err, res) {
            if (err) {
                console.log(err)
            } else {

                let pies = JSON.parse(data.toString());
                pies.delete(id);
                fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('data succesfully deleted.')
                    }
                })
            }
        })
    }
};
module.exports = pieRepo;