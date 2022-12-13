const mysql = require("mysql2");

//Connect database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "admin",
    database: "kurocode",
});

db.connect((error)=>{
    if(error) throw error;
    console.log("connected !")
});

module.exports = db;