const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

db.sequelize.sync().then(() => {
  console.log("Resync DB");
});

app.use(cors());
// parse requests of content-type - application/json
// parse requests of content-type – application/json
app.use(express.json());

// parse requests of content-type – application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route

require("./routes/auth.routes")(app);
require("./routes/list.routes")(app);
require("./routes/todo.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
