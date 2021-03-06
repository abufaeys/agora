'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
      foreignKey: "topicId",
      as: "banners",
    });

    Topic.hasMany(models.Post, {
      foreignKey: 'topicId',
      as: 'posts'
    });

    Topic.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Topic.addScope('lastFiveFor', (userId) => {
      return {
        where: { userId: userId },
        limit: 5,
        order: [['createdAt', 'DESC']]
      }
    });
  };

  return Topic;
};
