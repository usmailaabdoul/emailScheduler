const UserModel = require('../models/user');
class UserService {
  async createUser(token, user) {
    const _user = await this.getUserByToken(user.id);

    if (_user) {
      await this.updateToken(_user._id, token);
      return
    }
    const obj = {
      token,
      user,
      count: 1,
      access_token: token.access_token
    }
    await UserModel.create(obj);
    return;
  }

  async findUser(searchQuery = {}) {
    return await UserModel.find(searchQuery);
  }

  getByUserId(id) {
    return UserModel.findById(id);
  }

  async getUserByToken(id) {
    let user = await UserModel.findOne({'user.id': id}).exec();
    return user
  };

  async updateCountById(id, count) {
    return await UserModel.updateOne({ _id: id }, {count});
  };

  async updateToken(id, token) {
    await UserModel.updateOne({ _id: id }, {token});
    return
  }

  async updateUserCount(id) {
    const user = await this.getUserByToken(id);
    const currentCount = user.count;
    const newCount = currentCount + 1;
    await this.updateCountById(user._id, newCount);
    return;
  }
}

const service = new UserService();

module.exports = service;