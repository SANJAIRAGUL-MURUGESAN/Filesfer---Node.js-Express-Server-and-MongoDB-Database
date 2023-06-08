const express = require('express')

const {Files} = require('../Database/schema.js')

const {sessionowner} = require('../middlewares/sessionowner.js')

const availabler = express.Router()

availabler.post('/',sessionowner,async(req,res) => {
    try{
        const {shopID} = req.body
        const value = await Files.find( {ShopID : shopID}, { CustomerName: 1, Files_Available: 1 , _id: 1} )
        if(value.length===0){
            return res.status(404).json({
                Message : "Sorry! No Files Available..."
            })
        }
        res.send(value)
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Message : "There is an Error in Viewing the Files...."
        })
    }
})

module.exports = availabler