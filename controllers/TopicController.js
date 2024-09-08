import mongoose from "mongoose";

import Topic from '../models/topic.js';
import Technology from '../models/technology.js';
import { moveFileFunction, checkDataIsValid } from '../custom/secure.js';


export const getTopics = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { id } = req.params;
        const technology = await Technology.findById(id);

        if (!technology) {
            return res.status(404).json({ error: "Technology not found" });
        }

        const topics = await Topic.find({ technology_id: id }).skip(skip).limit(limit);

        // Count total topics for pagination
        const totalCount = await Topic.countDocuments({ technology_id: id });

        const response = {
            topics,
            technology,  // Include the technology details in the response
            pagination: {
                total_record: totalCount,
                per_page: limit,
                current_page: page,
                total_pages: Math.ceil(totalCount / limit)
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const createTopic = async (req, res) => {
    try {
        let topicDoc = '';
        // Check if there are files in the request
        if (req.files && req.files.document) {
            const uploadLocation = 'public/topic/';

            // Move the uploaded file to the specified directory
            const { message, up_file_path } = await moveFileFunction(req.files.document, `./${uploadLocation}`);

            // Handle any errors that occur during file upload
            if (message) return res.status(500).send({ error: message });

            // Validate the file path
            if (!checkDataIsValid(up_file_path)) {
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            topicDoc = up_file_path;  // Store the file path
        }

        // Create a new topic object with the request body and document path
        const topic = new Topic({
            technology_id: req.body.technology_id,
            topic_name: req.body.topic_name,
            document: topicDoc,
            url: req.body.url
        });

        const topicData = await topic.save();
        return res.json(topicData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating topic" });
    }
};

export const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;

        const existingTopic = await Topic.findById(id);

        if (!existingTopic || existingTopic.isDeleted) {
            return res.status(404).json({ error: 'Topic id not found' });
        }

        const updatedTopic = await Topic.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        
        res.json({ message: 'Topic marked as deleted', updatedTopic });
    } catch (error) {
        console.error(error);
        res.status(server_error).json({ error: 'Error deleting topic' });
    }
};

export const getCountByTechnology = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid or missing Technology ID" });
        }

        const technology = await Technology.findById(id);
        if (!technology) {
            return res.status(404).json({ error: "Technology not found" });
        }

        const topics = await Topic.find({ technology_id: id });

        const totalCount = await Topic.countDocuments({ technology_id: id });
        
        const response = {
            topics,
            technology,
            total_record: totalCount
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


