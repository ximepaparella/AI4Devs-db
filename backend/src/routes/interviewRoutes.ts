import express from 'express';
import { scheduleInterview, getInterviewsByApplication, updateInterviewFeedback } from '../application/services/interviewService';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const interview = await scheduleInterview(req.body);
        res.status(201).json(interview);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/application/:applicationId', async (req, res) => {
    try {
        const interviews = await getInterviewsByApplication(Number(req.params.applicationId));
        res.json(interviews);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/:id/feedback', async (req, res) => {
    try {
        const { feedback, score } = req.body;
        const interview = await updateInterviewFeedback(Number(req.params.id), feedback, score);
        res.json(interview);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router; 