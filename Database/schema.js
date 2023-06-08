const mongoose = require('mongoose');
const {db} = require('../Database/mongoose.js')

const ownerSchema = new mongoose.Schema({
    OwnerName: {
        type: String,
        required: true
    },
    OwnerEmail: {
        type: String
    },
    OwnerPassword: {
        type: String,
    },
    ShopID : {
        type: String
    }
})

const customerSchema = new mongoose.Schema({
    CustomerName : {
        type : String
    },
    ShopID : {
        type : String
    }
})

const fileSchema = new mongoose.Schema({
    ShopID : {
        type : String
    },
    CustomerName : {
        type : String
    },
    Files_Available : [{
        Original_Filename : String,
        Generated_Filename : String
    }]
})

module.exports = {
    Owner : db.model('Owner',ownerSchema,'OWNER'),
    Files : db.model('Files',fileSchema,'FILES'),
    Customer : db.model('Customer',customerSchema,'CUSTOMER')
}