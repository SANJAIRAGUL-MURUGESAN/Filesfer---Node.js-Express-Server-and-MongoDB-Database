const express = require('express')

const ownerlogin = express.Router()

const {validowner} = require('../middlewares/login.js')


ownerlogin.post('/',validowner,(req,res) => {
    // After Checking User Credintials
    try{
        const {ownername} = req.body
        req.session.owner_name = ownername
        return res.status(200).json({
            Message : "Log In Successful"
        })
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Message : "There is An Error in Loggeg in...."
        })
    }
})

module.exports = ownerlogin