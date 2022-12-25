const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
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
    async signIn(email, plainPassword) {
        try {
            // step 1 --> fetch user using the email from repo
            const user = await this.userRepository.getByEmail(email);
            // step2 --> compare incoming plain password with stored ecypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);
            if (!passwordsMatch) {
                console.log("Password doesn't match");
                throw { error: "Incorrect Password" };
            }
            // step 3 --> if  password match them create a token and send it to the user
            const newToken = this.createToken({ email: user.email, id: user.id });
            return newToken;
        } catch (error) {
            console.log("Something went wrong in singIn on service layer");
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
    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison on service layer", error);
            throw { error };
        }
    }
}

module.exports = UserService;