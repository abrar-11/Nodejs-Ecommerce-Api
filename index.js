const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoutes  = require("./routes/user");

const port = process.env.PORT || 8080;

// connected to Database ...
const connectDB = require("./database/db");


// Setup User Routes

app.use('/api/users',userRoutes)

// User Routes

connectDB()
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((err) =>

    console.log("Server Failed . No connection to Database  ", err.message)
  );


//   Staring server
app.listen(port, () =>
  console.log(
    "server is listing on Port: ",port
  )
);
