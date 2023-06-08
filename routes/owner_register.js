const  express = require('express')
const ownerregister = express.Router()
const {registermidleware} = require('../middlewares/register.js')


ownerregister.post('/',registermidleware,(req,res)=>{
    try{
        const {ownername} = req.body
        req.session.owner_name = ownername
        res.status(200).json({
            Message : "Registered Successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Message : "There is an Error in Registering"
        })
    }
})

module.exports = ownerregister