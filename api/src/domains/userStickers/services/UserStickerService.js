const UserSticker = require('../models/UserSticker.js');
const UserService = require('../../users/services/UserService.js');
const StickerService = require('../../stickers/services/StickerService.js');
const Sticker = require('../../stickers/models/Sticker.js');
const User = require('../../users/models/User.js');
const { Op } = require("sequelize");

class UserStickerService  {
  async create(userId, stickerNumber){
    const user = await UserService.getById(userId);
    const sticker = await StickerService.getByNumber(stickerNumber);
    const exists = await UserSticker.findOne({where:{ UserId: user.id, StickerId : sticker.id}});
    if(!exists){
      await UserSticker.create({UserId: user.id, StickerId: sticker.id, quantidade: 1});
    }else{
      console.log(exists);
      await exists.increment('quantidade');
    }
  }

  async getStickerByUser(userId, stickerNumber){
    const allStickers = await Sticker.findAll({
      where: {
        number: stickerNumber,
      },
    
      attributes: {
        exclude: ['createdAt', 'updatedAt', ],
      },
      include: {
        model: User,
        where: {
          id: userId,
        },

        through: {
          attributes: ['quantidade'],
        },

      }
    });

    return allStickers;
  }

  async getAllStickersByUser(userId){
    const allStickers = await Sticker.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: User,
        where: {
          id: userId,
        },

        through: {
          attributes: [],
        },

      }
    });

    return allStickers;
  }

  async getAllRepetidasByUser(userId){
    const allStickers = await UserSticker.findAll({
      where: {
        'UserId' : userId,
        'quantidade' : {
          [Op.gt] : 1,
        },
      },
    });
    
    return allStickers;
  }

  async getAllFaltantesByUser(userId){
    const allStickers = await Sticker.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: User,
        where: {
          id: {
            [Op.not] : userId,
          },
        },

        through: {
          attributes: [],
        },

      }
    });
    
    return allStickers;
  }

}

module.exports = new UserStickerService;