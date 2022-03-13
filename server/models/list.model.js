const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("lists", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Neu",
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return List;
};
