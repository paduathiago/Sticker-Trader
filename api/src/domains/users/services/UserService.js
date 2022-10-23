const UserModel = require("../models/User.js");
const UserEntity = require("../entities/UserEntity.js");
const NotAuthorizedError = require("../../../../errors/NotAuthorizedError.js");
const PermissionError = require("../../../../errors/PermissionError.js");
const QueryError = require("../../../../errors/QueryError.js");

class UserService {
  async create(body) {
    const user = await UserModel.findOne({ where: { email: body.email } });
    if (user) {
      throw new QueryError("E-mail já cadastrado!");
    } else {
      const user = new UserEntity({
        name: body.name,
        email: body.email,
        password: body.password,
      });

      await UserModel.create(user);
    }
  }

  async getAll() {
    const users = await UserModel.findAll({
      attributes: ["id", "name", "email"],
    });

    if (!users) {
      throw new QueryError("Não há nenhum usuário cadastrado");
    } else {
      return users;
    }
  }

  async getById(id) {
    const user = await UserModel.findByPk(id, {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    if (user) {
      return user;
    }
    throw new QueryError(`Não há um usuário com o ID ${id}!`);
  }

  async update(id, body, loggedUser) {
    const user = await this.getById(id);

    if (loggedUser.id != id) {
      throw new NotAuthorizedError(
        "Você não tem permissão para editar outro usuário!"
      );
    }

    await user.update(body);
  }

  async delete(id, idReqUser) {
    if (idReqUser == id) {
      throw new PermissionError("Não é possível deletar o próprio usuário!");
    } else {
      const user = await this.getById(id);
      await user.destroy();
    }
  }
}

module.exports = new UserService();
