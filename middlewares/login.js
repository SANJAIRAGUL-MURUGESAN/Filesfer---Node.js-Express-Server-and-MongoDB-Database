const {Owner} = require('../Database/schema.js')
const bcrypt = require('bcrypt')

const validowner = async(req,res,next)=>{
    try{
        const {ownername,ownerpassword} = req.body
        const isownerAvailable = await Owner.find({OwnerName:ownername})
        if(isownerAvailable.length===0){
            return res.status(404).json({
                Message : "Invalid Username "
            })
        }
        const opassword = isownerAvailable[0].OwnerPassword
        await bcrypt
            .compare(ownerpassword, opassword)
            .then(result => {
                // console.log(result) // return true
                if(result===false){
                    res.status(404).json({
                        Message : " Invalid Password "
                    })
                }else{
                    next()
                }
            })
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Message : "There is An Error in Loggeg in...."
        })
    }
}

module.exports = {validowner}