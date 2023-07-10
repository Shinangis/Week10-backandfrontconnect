// Module Imports
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");

// Enable express
const app = express();

//Middlewares

app.use(cors("http://localhost:3000"));
//app.use(express.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log(process.env.MYSQL_PASS);

// Default endpoint
app.get("/", (req, res) => {
  res.send("Hey the backend is connected.");
});

app.get("SELECT * FROM student", (req, res) => {
  pool.query("SELECT * FROM test1.team_mate;", function (err, result) {
    if (err) return console.log(err);
    res.send(result);
  });
});

const port = process.env.PORT;

app
  .listen(port, () =>
    console.log(`It's working yo, at http://localhost:${port}`)
  )
  .on("error", (error) => console.error(error));
