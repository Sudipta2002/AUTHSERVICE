const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig')
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create({
                email: data.email,
                password: data.password
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw { error };
        }
    }
    async getById(userId) {
        try {
            const user = await this.userRepository.getById(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw { error };
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '2h' })
            return result;
        } catch (error) {
            console.log("Something went wrong on token creation in service layer");
            throw { error };
        }
    }
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY)
            return response
        } catch (error) {
            console.log("Something went wrong in token verification on service layer", error);
            throw { error };
        }
    }

}

module.exports = UserService;