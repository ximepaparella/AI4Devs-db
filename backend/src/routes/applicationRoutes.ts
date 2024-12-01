import express from 'express';
import { 
    createApplication, 
    getApplicationsByPosition, 
    updateApplicationStatus,
    moveApplicationToNextStep 
} from '../application/services/applicationService';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const application = await createApplication(req.body);
        res.status(201).json(application);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/position/:positionId', async (req, res) => {
    try {
        const applications = await getApplicationsByPosition(Number(req.params.positionId));
        res.json(applications);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/:id/status', async (req, res) => {
    try {
        const { status, notes } = req.body;
        const application = await updateApplicationStatus(Number(req.params.id), status, notes);
        res.json(application);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/:id/step', async (req, res) => {
    try {
        const application = await moveApplicationToNextStep(Number(req.params.id), req.body.nextStep);
        res.json(application);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router; 