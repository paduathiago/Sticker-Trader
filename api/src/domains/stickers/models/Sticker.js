const database = require('../../../../database/index.js')
const {DataTypes} = require('sequelize');


const Sticker = database.define('Stickers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  selecao: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

/*
Comando para criar/alterar as
colunas da tabela caso necessário
 */
Sticker.sync({alter: true, force: true})
  .then(() => {
    console.log('Sticker table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = Sticker;
