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
const signIn = async(req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User Logged In Successfully",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        })
    }
}
const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: "User is authenticated and token is valid"
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
const isAdmin = async(req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err: {

            },
            message: "Succesfully fetched whether use is admin or not"
        });
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
module.exports = { create, signIn, isAuthenticated, isAdmin };