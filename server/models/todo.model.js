module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todos", {
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
  return Todo;
};
