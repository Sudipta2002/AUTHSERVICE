const UserService = require('../services/user-service');

const userService = new UserService();
const create = async(req, res) => {
    try {
        const response = await userService.create(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: "User Created Successfully",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        })
    }
}

module.exports = { create };