const UserStickerModel = require("../models/UserSticker.js");
const UserStickerEntity = require("../entities/UserStickerEntity.js");
const UserService = require("../../users/services/UserService.js");
const StickerService = require("../../stickers/services/StickerService.js");
const StickerModel = require("../../stickers/models/Sticker.js");
const UserModel = require("../../users/models/User.js");
const { Op } = require("sequelize");

class UserStickerService {
  async create(userId, stickerNumber) {
    const user = await UserService.getById(userId);
    let sticker = await StickerService.getByNumber(stickerNumber);

    if (!sticker) {
      sticker = await StickerModel.create({ number: stickerNumber });
    }

    const exists = await UserStickerModel.findOne({
      where: { userId: user.id, stickerId: sticker.id },
    });
    if (!exists) {
      const newUserSticker = new UserStickerEntity({
        userId: user.id,
        stickerId: sticker.id,
        amount: 1,
      });

      await UserStickerModel.create(newUserSticker.toObject());
    } else {
      await exists.increment("amount");
    }
  }

  async getStickerByUser(userId, stickerNumber) {
    const sticker = await StickerModel.findOne({
      where: {
        userId: userId,
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: StickerModel,
        where: {
          number: stickerNumber,
        },
      },
    });

    return sticker;
  }

  async getAllStickersByUser(userId) {
    const allStickers = await UserStickerModel.findAll({
      where: {
        userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: StickerModel,
      },
    });

    return allStickers;
  }

  async getAllDuplicatesByUser(userId) {
    const allStickers = await UserStickerModel.findAll({
      where: {
        userId,
        amount: {
          [Op.gt]: 1,
        },
      },
    });

    return allStickers;
  }

  async getAllMissingByUser(userId) {
    const allStickers = await StickerModel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: User,
        where: {
          id: {
            [Op.not]: userId,
          },
        },

        through: {
          attributes: [],
        },
      },
    });

    return allStickers;
  }
}

module.exports = new UserStickerService();
