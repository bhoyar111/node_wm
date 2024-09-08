import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../../models/user.js';
import loginValidate from '../../validate/loginValidate.js'
import customStatusCodes from "../../custom/status-codes.js";
const { ok, bad_request, server_error } = customStatusCodes;
import { getValidationErrMsg } from "../../custom/error-msg.js"


export const loginUser = async (req, res) => {
    try {
        const { email_id, password } = req.body;

        const { error } = loginValidate.validate(req.body);
        if(error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

        const user = await User.findOne({ email_id: email_id });
        if (!user) return res.status(bad_request).send({ error: { email_id: "email_id doesn't exist."} });

        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password;
        if (!isMatch) return res.status(bad_request).send({ error: { email_id: "Incorrect Password."} });

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '6h' });

        user.tokens = [{ token }];

        await user.save();

        res.status(ok).json({ message: "Login Successfully", user, token });
    } catch (error) {
        console.error(error);
        res.status(server_error).json({ error: 'Internal Server Error' });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const tokenBlacklist = new Set();
        const token = req.header('Authorization');
        if (tokenBlacklist.has(token)) {
            return res.status(bad_request).json({ message: 'Token already revoked. Please log in again.' });
        }
        tokenBlacklist.add(token);
        res.status(ok).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(server_error).json({ error: 'Internal Server Error' });
    }
};
