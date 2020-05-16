var express = require("express");

var app = express();

const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Develop/public"));


require("./Develop/routes/apiRoutes")(app);
require("./Develop/routes/htmlRoutes")(app);






app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
})