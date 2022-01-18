module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    repository: {
      type: Sequelize.STRING,
    },
  });

  return Project;
};
