const express = require('express')
const { sessionowner } = require('../middlewares/sessionowner')
const { Owner } = require('../Database/schema')

const ownerlogout = express.Router()

ownerlogout.post('/',sessionowner,async(req,res) => {
    try{
        const {ownername,password} = req.body
        const owneravailable = await Owner.find({OwnerName:ownername})
        if(owneravailable.length===0){
            return res.status(404).json({
                Message : "You Must Log In to Log Out"
            })
        }
        const ownerpassword = owneravailable[0].ownerpassword
        if(ownerpassword===password){
            const sessionID = req.session.id
            req.sessionStore.destroy(sessionID,(err) => {
                res.status(200).json({
                    Message : "You had Logged Out"
                })
            })
            
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({
            Message : "There is an Error in Logging Out..."
        })
    }
})

module.exports = ownerlogout