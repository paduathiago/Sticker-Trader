const Sticker = require('../models/Sticker.js');
const QueryError = require('../../../../errors/QueryError.js');

class StickerService {
  async create(body) {
    const newSticker = {
      numero: body.numero,
      nome: body.nome,
      selecao: body.selecao,
    };

    await Sticker.create(newSticker);
  }

  async createAll() {
    let x = 200
    while (x>0){
      let newSticker = {
        number: x
      }
      await Sticker.create(newSticker);
      x = x-1;
    }
  }

  async getAll() {
    const stickers = await Sticker.findAll();

    if (!stickers) {
      throw new QueryError('Não há nenhuma figurinha cadastrada');
    }

    return stickers;
  }

  async getById(id) {
    const sticker = await Sticker.findByPk(id);

    if (!sticker) {
      throw new QueryError(`Não há uma figurinha com o ID ${id}!`);
    }

    return sticker;
  }
  
  async getByNumber(numero) {
    const sticker = await Sticker.findOne({where: {number: numero}});

    if (!sticker) {
      throw new QueryError(`Não há uma figurinha com o número ${numero}!`);
    }

    return sticker;
  }

  async update(id, body) {
    const sticker = await this.getById(id);
    await sticker.update(body);
  }

  async delete(id) {
    const sticker = await this.getById(id);
    await sticker.destroy();
  }
}

module.exports = new StickerService;
