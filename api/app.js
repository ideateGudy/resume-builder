const express = require("express");
const config = require("./config/main");
const AuthRoutes = require("./routes/AuthRoutes");

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/auth", AuthRoutes);



app.listen(3000, () => console.log("Server started on port 3000"));