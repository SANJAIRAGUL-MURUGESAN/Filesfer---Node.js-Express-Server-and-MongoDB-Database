const mongoose = require('mongoose');

const con = mongoose.createConnection('mongodb://127.0.0.1:27017/');


const db = con.useDb('Filesfer')

module.exports = { db }

// https://youtu.be/uXDnS5PcjCA