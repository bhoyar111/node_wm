import bcrypt from 'bcrypt'

import User from '../models/user.js';
import validateUser from '../validate/userValidate.js';
import customStatusCodes from "../custom/status-codes.js";
const { ok, created, bad_request, server_error } = customStatusCodes;
import { getValidationErrMsg, getIdNotFoundCommonMsg } from "../custom/error-msg.js"

export const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Filter parameters
        var filters = {};
        if (req.query.search) {
            filters = {
                $or:[
                    { 'fName': new RegExp(`${req.query.search}`, "i") },
                    { 'lName': new RegExp(`${req.query.search}`, "i") },
                    { 'email': new RegExp(`${req.query.search}`, "i") },
                    { 'email': new RegExp(`${req.query.search}`, "i") },
                ]
            }
        }

        const users = await User.find(filters).skip(skip).limit(limit);

        const totalCount = await User.countDocuments(filters);
        const pageData = {
            total_record: totalCount,
            per_page: limit,
            current_page: page,
            total_pages: Math.ceil(totalCount / limit)
        };

        res.status(ok).json({ users, pageData });
    } catch (error) {
        console.error(error);
        res.status(server_error).json({ error: 'Internal Server Error' });
    }
};


export const createUser = async (req, res) => {
    try {
        const { error, value } = validateUser.validate(req.body);
        if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

        const { fName, lName, email, password, mobile } = value;
        const userExist = await User.findOne({ email }); 
        if (userExist) return res.status(bad_request).send({ error: { email: " This email has been already used."} });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fName,
            lName,
            email,
            password: hashedPassword,
            mobile
        });
        const savedUser = await user.save();
        res.status(created).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(server_error).json({ error: 'Error creating' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('user') });

        res.status(ok).json(user);
    } catch (error) {
        console.error(error);
        res.status(server_error).json({ error: 'Error retrieving' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const { error, value } = validateUser.validate(req.body);
        // if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('user') });

        const userExist  = await User.findOne({ email: value.email, _id: { $ne: id } });
        if (userExist) return res.status(bad_request).json({ error: { email: 'This email is already in use.' } });

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedUser.password = hashedPassword;
        }

        const savedUser = await updatedUser.save();

        res.status(created).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(server_error).json({ error: 'Error updating' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

        if (!updatedUser) {
            return res.status(not_found).json({ error: 'User Not found' });
        }

        res.json({ message: 'User marked as deleted' });
    } catch (error) {
        console.error(error);
        res.status(server_error).json({ error: 'Error deleting user' });
    }
}