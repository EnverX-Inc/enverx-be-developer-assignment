const sequelize = require('./../lib/db.js')
const {Sequelize, DataTypes} = require('sequelize');

const Post = sequelize.define('posts', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue:''
    },
    blogName: {
      type: DataTypes.STRING(200),
      defaultValue:''
    },
    blogContent: {
      type: DataTypes.TEXT,
      defaultValue:''
    },
  });

 module.exports = Post 
  