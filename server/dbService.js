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

  createUser = async (userID, score) => {
    try {
      const date = new Date();

      const insertDate = await new Promise((resolve, reject) => {
        const query = `INSERT INTO user (name, email, password  ) 
          VALUES ('${username}', '${score}', '${date}')`;
        con.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          console.log(result);
          resolve(result);
        });
      });
      return {
        Username: username,
        Score: score,
        Date: insertDate,
      };
    } catch (error) {
      console.log(error);
    }
  };

  // Funktion zum Abrufen der Highscores in absteigender Reihenfolge
  // Parameter x gibt an wie viele der besten Highscores angezeigt werden sollen
  createTodo = async (x) => {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM player_score ORDER BY Score DESC LIMIT ${x}`;

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

  getTodosOfUser = async () => {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM player_score ORDER BY Score DESC`;

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

  // Überprüfen, ob vom User eingegebener Username bereits existiert
  // Setzt Flag zum Erstellen eines neuen oder Ändern eines bereits bestehenden PlayerScores
  checkUsername = async (username) => {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM player_score WHERE Username = '${username}'`;
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

  async updatePlayerScore(username, score) {
    try {
      const date = new Date();
      const response = await new Promise((resolve, reject) => {
        const query = `UPDATE player_Score SET Score = ${score}, Date = '${date}' WHERE Username = '${username}'`;

        con.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = DbService;
