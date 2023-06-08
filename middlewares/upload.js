const util = require("util");
const multer = require("multer");
const crypto = require('crypto');
const path = require('path');
const dbConfig = require("../config/db");
const { GridFsStorage } = require("multer-gridfs-storage");
const { Files } = require("../Database/schema.js")

try{
  var storage = new GridFsStorage({
    url: dbConfig.url + dbConfig.database,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);

          const customername = req.session.customer_name
          const shopid = req.session.shop_id
          const Filename = [
            {
              Original_Filename : file.originalname,
              Generated_Filename : filename
            }
          ]

          const callFunction = ()=>{
            const add1 = new Files({
              CustomerName : customername,
              ShopID  : shopid,
              Files_Available : Filename
            })
            add1.save()

          }
          callFunction()

        const fileInfo = {
            filename: filename,
            bucketName: dbConfig.Bucket
          };
          resolve(fileInfo);
        });
      });
    }
  });
}catch(err){
  console.log(err)
  return res.status(404).json({
    Message : "Error in Uploading Files"
  })
}

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = {uploadFilesMiddleware}

