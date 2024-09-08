import Technology from '../models/technology.js';

export const getTechnologies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const technologies = await Technology.find().skip(skip).limit(limit);
        const totalCount = await Technology.countDocuments();

        const response = {
            technologies: technologies,
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


export const createTechnology = async (req, res) => {
    try {
        const technology = new Technology(req.body);
        const savedTechnology = await technology.save();
        res.json(savedTechnology);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error creating"})
    }
};

export const technologyWTC = async (req, res) => {
    try {
        const technologies = await Technology.find().populate('topics');
        res.status(200).json({ technologies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
