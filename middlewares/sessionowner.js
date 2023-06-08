const express = require('express')

const sessionowner = (req,res,next)=>{
    try{
        if(!req.session.owner_name){
            return res.status(200).json({
                Message : "You Need to Login to Download and See Files"
            })
        }
        next()
    }catch(err){
        console.log(err)
        res.status(404).json({
            Message : "Ther is an Error in doing Operations..."
        })
    }
}

module.exports = {sessionowner}