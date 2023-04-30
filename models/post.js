const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      //I dont think I need this ↓
    // username:{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
    postTitle:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // now a user is attached to a post
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      }
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'post'
}
);

module.exports = Post;