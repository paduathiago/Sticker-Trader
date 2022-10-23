const User = require("../src/domains/users/models/User");
const Sticker = require("../src/domains/stickers/models/Sticker");
const UserSticker = require("../src/domains/userStickers/models/UserSticker");

models = { User, Sticker, UserSticker };

for (modelName in models) {
  models[modelName]
    .sync({ alter: true, force: false })
    .then(() => {
      console.log(`${modelName} table synced.`);
    })
    .catch((err) => console.log(err));
}

for (modelName in models) {
  try {
    models[modelName].associate(models);
    console.log(`${modelName} relations synced.`);
  } catch (err) {
    console.log(err);
  }
}
