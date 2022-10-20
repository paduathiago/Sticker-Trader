const router = require('express').Router();
const UserStickerService = require('../services/UserStickerService.js');
const {verifyJWT} = require('../../../middlewares/auth-middlewares');
const statusCodes = require('../../../../constants/statusCodes.js');


//Adiciona figurinhas faltantes e repetidas (caso ele ja tiver vai adicionar nas repetidas)
router.post('/:stickerNumber',
  verifyJWT,
  async (req, res, next) => {
    try {
      await UserStickerService.create(req.user.id, req.params.stickerNumber);
      res.status(statusCodes.created).end();
    } catch (error) {
      next(error);
    }
  },
);

//Retorna se o usuário tem a figurinha de número x
router.get('/users/stickers/:stickerNumber',
  verifyJWT,
  async (req, res, next) => {
    try{
      const stickers = await UserStickerService.getStickerByUser(req.user.id, req.params.stickerNumber);
      res.status(statusCodes.success).json(stickers);
    }catch (error){
      next(error);
    }
  },
);


//Retorna figurinhas obtidas do usuário logado
router.get('/users/all',
  verifyJWT,
  async (req, res, next) => {
    try{
      const stickers = await UserStickerService.getAllStickersByUser(req.user.id);
      res.status(statusCodes.success).json(stickers);
    }catch (error){
      next(error);
    }
  },
);

//Retorna repetidas do usuário logado
router.get('/repetidas',
  verifyJWT,
  async (req, res, next) => {
    try{
      const stickers = await UserStickerService.getAllRepetidasByUser(req.user.id);
      res.status(statusCodes.success).json(stickers);
    }catch (error){
      next(error);
    }
  },
);

//Retorna faltantes do usuário logado
router.get('/faltantes',
  verifyJWT,
  async (req, res, next) => {
    try{
      const stickers = await UserStickerService.getAllFaltantesByUser(req.user.id);
      res.status(statusCodes.success).json(stickers);
    }catch (error){
      next(error);
    }
  },
);


router.delete('/stickers/:id',
  verifyJWT,
  async (req, res, next) => {
    try {
      await StickerService.delete(req.params.id);
      res.status(statusCodes.noContent).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
