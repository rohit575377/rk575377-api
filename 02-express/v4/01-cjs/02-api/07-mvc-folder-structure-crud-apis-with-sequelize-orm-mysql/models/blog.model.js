const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user.model');

class Blog extends Model { }

Blog.init(
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Blog', // We need to choose the model name
  },
);

Blog.belongsTo(User, { foreignKey: 'userId', as: 'author', onDelete: 'CASCADE' });

// the defined model is the class itself
// console.log(Blog === sequelize.models.Blog); // true

module.exports = Blog;
