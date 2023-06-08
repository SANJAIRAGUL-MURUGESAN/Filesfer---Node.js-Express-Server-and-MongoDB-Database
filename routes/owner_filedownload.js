const express = require("express")
const {Files} = require('../Database/schema.js')
const dbConfig = require("../config/db.js");
const {sessionowner} = require('../middlewares/sessionowner.js')
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;
const mongoClient = new MongoClient(url);
const downloader = express.Router()

downloader.post('/',sessionowner,async(req,res)=>{

    try{
      const {filename,customername,shopid} = req.body
      const generate_filename = await Files.find({ "Files_Available.Original_Filename": filename , "ShopID" : shopid , "CustomerName" : customername} );
      if(generate_filename.length===0){
        return res.status(404).json({
          Message : "No Files Available to Download"
      })
      }
      const filenames = generate_filename[0].Files_Available[0].Generated_Filename

      const download = async (name) => {

          await mongoClient.connect();
      
          const database = mongoClient.db(dbConfig.database);
          const bucket = new GridFSBucket(database, {
            bucketName: dbConfig.Bucket,
          });
      
          let downloadStream = bucket.openDownloadStreamByName(name);
      
          downloadStream.on("data", function (data) {
            return res.status(200).write(data);
          });
      
          downloadStream.on("error", function (err) {
            // console.log(err)
            return res.status(404).send({ message: "Cannot download the File!" });
          });
      
          downloadStream.on("end", () => {
            return res.end();
          });
      };
      download(filenames)

    }catch(err){
      console.log(err)
      return res.status(404).json({
        Message : "There is An Error in Downloading the File..."
      })
    }




})

module.exports = downloader
