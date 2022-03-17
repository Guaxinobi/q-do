module.exports = (sequelize, Sequelize) => {
  const Subtodo = sequelize.define("subtodos", {
    title: {
      type: Sequelize.STRING,
    },
    checked: {
      type: Sequelize.BOOLEAN,
    },
    archived: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Subtodo;
};
