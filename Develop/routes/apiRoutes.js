var noteData = require("../db/db.json");
// var records = [];
const { v4: uuidv4 } = require('uuid');
var fs = require("fs")
var records = [];

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
      fs.readFile("./db/db.json", "utf-8", function(err,data){
        console.log("Get route",err,data)
        // noteData = JSON.parse(data)
        res.json(JSON.parse(data));
        
      });
  
   
  });



  

  app.post("/api/notes", function(req, res) {
   
    var record = {
        id:  uuidv4(),
        title:req.body.title,
        text:req.body.text
    }
    
    records.push(record);

    // noteData.push(records.body);
      // data.push(records)
    fs.writeFile("./db/db.json", JSON.stringify(records), "utf-8", function(err, data) {
        if(err){
            throw err
        }
        console.log(data);
        res.send("Succesfully written");
    });
        
      // noteData.push(records);
      // res.json(noteData);
    
  });





 

  app.delete("/api/note/:id", function(req, res) {
    // Empty out the arrays of data
    console.log(req.params.id);
    fs.readFile("")
    res.json({ ok: true });
  });
};
