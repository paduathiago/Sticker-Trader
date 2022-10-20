const database = require('../../../../database/index.js')
const {DataTypes} = require('sequelize');

const Sticker = require('../../stickers/models/Sticker.js');
const User = require('../../users/models/User.js');

const UserSticker = database.define('UserSticker', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

Sticker.belongsToMany(User, {
  through: UserSticker,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

User.belongsToMany(Sticker, {
  through: UserSticker,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

//Super Many-to-Many
Sticker.hasMany(UserSticker);
UserSticker.belongsTo(Sticker);
User.hasMany(UserSticker);
UserSticker.belongsTo(User);

UserSticker.sync({alter: true, force: true})
  .then(() => {
    console.log('UserSticker table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = UserSticker;