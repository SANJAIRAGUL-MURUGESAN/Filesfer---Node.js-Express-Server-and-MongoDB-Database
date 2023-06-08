const express = require('express')
const bcrypt = require('bcrypt')
const saltRounds = 10  
const {Owner} = require('../Database/schema.js')

const registermidleware = async(req,res,next)=> {
    const {ownername,owneremail,ownerpassword,shopID} = req.body
    try{
        const isownerAvailable = await Owner.find({OwnerName : ownername})
        if(isownerAvailable.length!==0){
            return res.status(404).json({
                Message : "Ownername Already Exists"
            })
        }else{
            const shopid = await Owner.find({ShopID:shopID})
            if(shopid.length!==0){
                return res.status(404).json({
                    Message : "Shop ID Already Exists"
                })
            }
            await bcrypt
                .hash(ownerpassword, saltRounds)
                .then((hash) => {
                    // console.log('Hash ', hash)
                    const add = new Owner({
                        OwnerName : ownername,
                        OwnerEmail  : owneremail,
                        OwnerPassword : hash,
                        ShopID : shopID
                    })
                    add.save()
                })
            next()
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Message : "There is an Error in Registering...."
        })
    }
}

// register()

module.exports = {registermidleware}