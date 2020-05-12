var noteData = require("../db/db.json");

const { v4: uuidv4 } = require('uuid');
var fs = require("fs")


module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
      fs.readFile("../db/db.json", function(err,data){
        console.log("Get route",err,data)
        noteData = JSON.parse(data)
        res.json(noteData);
      });
    // res.json(data)
   
  });



  

  app.post("/api/notes", function(req, res) {
   
    var records = {
        id:  uuidv4(),
        title:req.body.title,
        text:req.body.text
    }

    noteData.push("notes", records);
    // data.push(records)
    fs.writeFile("../db/db.json", noteData, function(err, data) {
        if(err){
            throw err
        }
        console.log(data);
        res.json(noteData);
    });
        console.log(records);
      noteData.push(records);
      res.json(noteData);
    
  });

 

  app.delete("/api/note/:id", function(req, res) {
    // Empty out the arrays of data
    console.log(req.params.id);

    res.json({ ok: true });
  });
};
