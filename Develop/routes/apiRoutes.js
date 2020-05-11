// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var noteData = require("../db/db.json");
var uId = require("uuid");
const { v4: uuidv4 } = require('uuid');
var fs = require("fs")



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
      console.log("Get route",noteData)
    res.json(noteData);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    var records = {
        id:  uuidv4(),
        title:req.body.title,
        text:req.body.text
    }

    noteData.push("data",records);
    fs.writeFile("../db/db.json", noteData, function(err, data) {
        if(err){
            throw err
        }
        console.log(data);
        res.json(noteData);
    });
    //     console.log(records);
    //   noteData.push(records);
    //   res.json(noteData);
    
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.delete("/api/note/:id", function(req, res) {
    // Empty out the arrays of data
    console.log(req.params.id);

    res.json({ ok: true });
  });
};
