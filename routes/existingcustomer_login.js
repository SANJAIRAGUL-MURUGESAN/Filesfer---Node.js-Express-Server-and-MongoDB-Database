const express = require('express')
const existingcustomerlogger = express.Router()

const {Customer} = require('../Database/schema.js')

existingcustomerlogger.post('/',async(req,res) => {
    try{
        const {customername,shopID} = req.body
        const aleadycustomer = await Customer.find({CustomerName:customername})
        if(aleadycustomer.length===0){
            return res.status(404).json({
                Message : "Customer Name Does Not Exists"
            })
        }
        req.session.customer_name = customername
        req.session.shop_id = shopID 
        res.status(404).json({
            Message : "Log In Successful"
        })
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Message : "There is an Error in Logging in..."
        })
    }
})

module.exports = existingcustomerlogger