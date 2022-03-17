const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.list = require("../models/list.model.js")(sequelize, Sequelize);
db.todo = require("../models/todo.model.js")(sequelize, Sequelize);
db.subtodo = require("../models/subtodo.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(
  sequelize,
  Sequelize
);

db.user.hasOne(db.refreshToken);
db.refreshToken.belongsTo(db.user);
db.user.hasMany(db.list);
db.list.belongsTo(db.user);
db.list.hasMany(db.todo);
db.todo.belongsTo(db.list);
db.todo.hasMany(db.subtodo);
db.subtodo.belongsTo(db.todo);

module.exports = db;
