'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    isChecked: DataTypes.BOOLEAN,
    isBlocked: DataTypes.BOOLEAN
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    models.Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false
    }),
    models.Comment.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
        allowNull: false
    }),
    models.Comment.hasMany(models.SubComment)
  };
  return Comment;
};