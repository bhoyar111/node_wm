import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema({
    technology_name: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
    }],
}, { timestamps: true });

const Technology = mongoose.model('Technology', technologySchema);

export default Technology;