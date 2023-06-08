const express = require('express')

const sessioncustomer = (req,res,next)=>{
    try{
        if(!req.session.customer_name){
            return res.status(200).json({
                Message : "You Need to Login to Upload Files"
            })
        }
        next()
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Message : "There is an Error in Uploading Files..."
        })
    }
}

module.exports = {sessioncustomer}