const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const url = "mongodb+srv://readOnly:readOnlyP455word@cluster0.csogb.mongodb.net/fwdsec";

const getEHLO=(req,res,client) =>{
  res.json({"alive":"true"})
}

const getTableData = (req, res, client) =>{
    console.log("getData Requested");
     client.connect(function(err,client){
      client.db("fwdsec").collection("threat").find({}).toArray(function(err, result) {
        if (err) {
          console.log("error on operation");
          console.log(err);
          throw err;
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
      });
    });
  }
  
  //Insert
  const postTableData = (req, res, client) => {
    const { id,Title,Description,RelatedAsset,Classification,Impact,Likelihood,RiskLevel } = req.body;
    console.log("Insert Data");

    client.connect( function(err, db) {
        if (err) {
          console.log("error on connect");
          console.log(err);
          throw err;
        }
        var dbo = db.db("fwdsec");
        var myobj =  {
          id:id,
          Title:Title,
          Description:Description,
          RelatedAsset:RelatedAsset,
          Classification:Classification,
          Impact:Impact,
          Likelihood:Likelihood,
          RiskLevel:RiskLevel
          } ;
        var result = dbo.collection("threat").insertOne(myobj, function(err, res) {
          if (err){
            console.log("error on operation");
            console.log(err);
            throw err;
          }
          console.log(res);
          console.log(myobj);
          console.log("1 document inserted");
          db.close();
        });
        console.log("result");
        console.log(result);
      });
      res.sendStatus(200,{
        id:id,
        Title:Title,
        Description:Description,
        RelatedAsset:RelatedAsset,
        Classification:Classification,
        Impact:Impact,
        Likelihood:Likelihood,
        RiskLevel:RiskLevel
        });
  
  }
  
  //Update
  const putTableData = (req, res, client) => {
    const { _id, id,Title,Description,RelatedAsset,Classification,Impact,Likelihood,RiskLevel } = req.body
    console.log("Update Data");
    console.log(req.body);
    client.connect( function(err, db) {
        if (err) throw err;
        var dbo = db.db("fwdsec");
        var myquery = { _id: mongodb.ObjectId(_id)  };
        var newvalues = { $set: {
          Title:Title,
          Description:Description,
          RelatedAsset:RelatedAsset,
          Classification:Classification,
          Impact:Impact,
          Likelihood:Likelihood,
          RiskLevel:RiskLevel } };
        dbo.collection("threat").updateOne(myquery, newvalues, function(err, res) {
          if (err) {
            console.log("error on update");
            console.log(err);
            throw err;
          }
          console.log("1 document updated");
          db.close();
        });
      });
      res.sendStatus(200,{
        _id: mongodb.ObjectId(_id) ,
        id:id,
        Title:Title,
        Description:Description,
        RelatedAsset:RelatedAsset,
        Classification:Classification,
        Impact:Impact,
        Likelihood:Likelihood,
        RiskLevel:RiskLevel
        });
  }

  //Delete
  //TODO: Refactor delete to be consistant with other methods
  const deleteTableData = (req, res, clients) => {
    const { _id,id } = req.body;
    console.log("Delete Data");
    var myquery = {_id:  mongodb.ObjectId(_id) };
    
    MongoClient.connect(url,function(err,client){
      var db = client.db("fwdsec");
      db.collection("threat").deleteOne(myquery)
      .then(function(result){
        console.log(result);
      });
      client.close();
    });
      res.sendStatus(200);
  }
  

  module.exports = {
    
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
  }