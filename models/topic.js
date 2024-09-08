import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    technology_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technology',
        required: true,
    },
    topic_name: {
        type: String,
        required: true,
    },
    document: {
        type: String,
    },
    url: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;