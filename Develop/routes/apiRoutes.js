var noteData = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');
var fs = require("fs")
var records = [];
var path = require("path");

// path.join(__dirname, "./Develop/db/db.json");

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", function (err, data) {

      // let parsedData = JSON.parse(data);
      res.json(data);

      console.log(data);

    });


  });





  app.post("/api/notes", function (req, res) {

    var record = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text
    }

    records.push(record);

    fs.writeFile("./Develop/db/db.json", JSON.stringify(records), function (err, data) {
      if (err) {
        throw err
      }
      
      res.send("Succesfully written");
    });

  });







  app.delete("/api/notes/:id", function (req, res) {

    console.log(req.params.id);
    var noteId = req.params.id;

    fs.readFile("./Develop/db/db.json", "utf-8", function (err, data) {

      let parsedData = JSON.parse(data);


      for (i = 0; i < parsedData.length; i++) {

        if (parsedData[i].id === noteId) {
          console.log("id found");
          parsedData.splice(i, 1);

        }
        console.log(parsedData[i]);
      }

      fs.writeFile("./Develop/db/db.json", JSON.stringify(parsedData), function (err, data) {
        if (err) {
          throw err
        }

        console.log(parsedData);
        res.send("Succesfully written");
      });

    });

  });

};
