import express from 'express';

// import { authenticateToken } from '../middleware/authToken.js';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController.js';
import { loginUser, logoutUser } from '../controllers/auth/LoginController.js'
import { getTechnologies, createTechnology, technologyWTC } from '../controllers/TechnologyController.js'
import { getTopics, createTopic, deleteTopic, getCountByTechnology } from '../controllers/TopicController.js'

const router = express.Router();

// For Topic
router.get('/topics/:id', getTopics);
router.post('/topic-add', createTopic);
router.delete('/topic-delete/:id', deleteTopic);
router.get('/topic-tech-count/:id', getCountByTechnology);

// For Technology
router.get('/technologies', getTechnologies);
router.post('/technology-add', createTechnology);
router.get('/tech-topic-count', technologyWTC);

// For Login 
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// For Users
router.get('/users', getAllUsers);
router.post('/user-add', createUser);
router.get('/user-get/:id', getUserById);
router.put('/user-update/:id', updateUser);
router.delete('/user-delete/:id', deleteUser);

export default router;
