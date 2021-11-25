const mysql = require("mysql");
const connection = require("./dbConfig");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

// single queries for db initiation
let createUserTable =
  "CREATE TABLE user ( userID INT AUTO_INCREMENT PRIMARY KEY UNIQUE, name VARCHAR(30) NOT NULL, portrait BLOB, email VARCHAR(30), password VARCHAR(30), created_date DATETIME NOT NULL DEFAULT NOW(),  modifed_date DATETIME  )";

let createToDoTable =
  "CREATE TABLE todo ( todoID INT AUTO_INCREMENT PRIMARY KEY UNIQUE, name VARCHAR(30), userID INT, FOREIGN KEY (userID) REFERENCES user(userID))";

let createSubToDoTable =
  "CREATE TABLE subTodo ( subTodoID INT AUTO_INCREMENT PRIMARY KEY UNIQUE, name VARCHAR(30), todoID INT, FOREIGN KEY (todoID) REFERENCES todo(todoID))";

// array of queries above
const queryList = [createUserTable, createToDoTable, createSubToDoTable];

// function to create MySQL DB
const createDB = async () => {
  await con.query("CREATE DATABASE IF NOT EXISTS qdo", (err, result) => {
    if (err) return console.log("create db: ", err);
    console.log("DB created");
    queryList.forEach(async (item) => {
      connection.query(item, (err) => {
        if (err) return console.log("create table: ", err);
        console.log("table successfully created");
      });
    });

    connection.end();
  });
};

createDB();
