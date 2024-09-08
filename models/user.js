import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({    
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
