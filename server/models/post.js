"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: "users_id",
        targetKey: "users_id",
      });
      models.Post.belongsTo(models.Habit, {
        foreignKey: "habits_id",
        targetKey: "habits_id",
      });
      models.Post.belongsTo(models.Userhabit, {
        foreignKey: "userhabit_id",
        targetKey: "userhabit_id",
      });
    }
  }
  Post.init(
    {
      posts_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      timestamps: true,
      underscored: true,
      charset: "utf8",
    }
  );
  return Post;
};