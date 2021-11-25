const Connection = require("./dbConfig");
let instance = null;

const con = Connection;

// Tatsächlicher Verbindungsaufbau zur DB
con.connect(function (err) {
  if (err) {
    console.log("Verbindung fehlgeschlagen: Error: ", err);
  } else {
    console.log("Verbindung zur Datenbank hergestellt!");
  }
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  createUser = async (email, password) => {
    try {
      const query = `INSERT INTO user ( email, password  ) VALUES ('${email}', '${password}')`;
      con.query(query, (err, result) => {
        if (err) reject(new Error(err.message));
        console.log(result);
        resolve(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  createTodo = async (name, userID) => {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `INSERT INTO todo (name, userID) VALUES ('${name}','${userID}' )`;

        con.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  getTodosOfUser = async (userID) => {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM todo WHERE userID === '${userID}'`;

        con.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //

  checkUser = async (email) => {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM user WHERE email = '${email}'`;
        con.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          console.log(result);
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  async updateTodo(todoID, newName) {
    try {
      const query = `UPDATE todo SET name = ${newName}, Date = NOW() WHERE todoID = '${todoID}'`;
      con.query(query, (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = DbService;
