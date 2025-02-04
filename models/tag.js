'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    //models.Tag.hasMany(models.RecipeTag)
    models.Tag.belongsToMany(models.Recipe, { as: 'recipes', through: 'RecipeTag', foreignKey: 'tagId' });
    
  };
  return Tag;
};