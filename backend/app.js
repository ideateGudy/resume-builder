const express = require("express");
const cors = require("cors");
const config = require("./config/main");
const AuthRoutes = require("./routes/AuthRoutes");

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use("/auth", AuthRoutes);



app.listen(4500, () => console.log("Server started on port 4500"));