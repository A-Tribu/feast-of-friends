const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Dish extends Model {}

Dish.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    dishname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preparedby: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
    eventid: {
      type: DataTypes.UUID,
      references: {
        model: 'event',
        key: 'id',
      },
    },
    // has_nuts: {
    //   type: DataTypes.BOOLEAN,
    // },
  },
  {
    sequelize,
    timestamps: false,
    // underscored: true,
    freezeTableName: true,
    modelName: 'dish',
  }
);

module.exports = Dish;
