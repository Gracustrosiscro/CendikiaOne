require('dotenv').config()
const connection = require('../config/db')
module.exports = {
    getAllNote: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from note', (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllCat: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from category', (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postCat: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT into category set ? ',data, (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postNote: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT into note set ? ',data, (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
}