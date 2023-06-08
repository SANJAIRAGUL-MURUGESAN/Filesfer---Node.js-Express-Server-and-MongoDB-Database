const express = require('express')
const {Customer} = require('../Database/schema.js')

const customerlogin = express.Router()

customerlogin.post('/',async(req,res) => {
    try{
        const {customername,shopID} = req.body
        const iscustomerAvailable = await Customer.find( { $and: [{ShopID : shopID},{CustomerName : customername}] })
        if(iscustomerAvailable.length!==0){
            return res.status(404).json({
                Message : "Customer Name Already Exists"
            })
        }
        const addcustomer = new Customer({
            CustomerName : customername,
            ShopID : shopID
        })
        addcustomer.save()
        req.session.customer_name = customername
        req.session.shop_id = shopID
        return res.status(200).json({
            Message : "Log In Successfull"
        })
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Message : "There is an Error in Loggin in..."
        })
    }
})

module.exports = customerlogin