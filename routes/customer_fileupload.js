const express = require('express')
const uploader = express.Router()
const {sessioncustomer} = require('../middlewares/sessioncustomer.js')
const {uploadFilesMiddleware} = require("../middlewares/upload.js")


uploader.post('/',sessioncustomer,async(req,res)=>{

    try {

      await uploadFilesMiddleware(req, res);
      // console.log(req.body)

      if (req.file == undefined) {
        return res.send({
          message: "You must select a file.",
        });
      }

      return res.send({
        message: "File has been uploaded.",
      });
    } catch (error) {
      console.log(error);

      return res.send({
        message: `Error when trying upload File: ${error}`,
      });
    }
})



module.exports = uploader