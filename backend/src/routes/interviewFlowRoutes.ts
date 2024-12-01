import express from 'express';
import { addInterviewFlow, getInterviewFlowWithSteps, updateInterviewFlowStatus } from '../application/services/interviewFlowService';
import { addInterviewStep, getInterviewStepsByFlow, updateStepOrder } from '../application/services/interviewStepService';

const router = express.Router();

// Rutas para InterviewFlow
router.post('/', async (req, res) => {
    try {
        const flow = await addInterviewFlow(req.body);
        res.status(201).json(flow);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const flow = await getInterviewFlowWithSteps(Number(req.params.id));
        if (!flow) {
            return res.status(404).json({ error: 'Flujo de entrevista no encontrado' });
        }
        res.json(flow);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/:id/status', async (req, res) => {
    try {
        const flow = await updateInterviewFlowStatus(Number(req.params.id), req.body.isActive);
        res.json(flow);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Rutas para InterviewStep
router.post('/:flowId/steps', async (req, res) => {
    try {
        const stepData = {
            ...req.body,
            interviewFlowId: Number(req.params.flowId)
        };
        const step = await addInterviewStep(stepData);
        res.status(201).json(step);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:flowId/steps', async (req, res) => {
    try {
        const steps = await getInterviewStepsByFlow(Number(req.params.flowId));
        res.json(steps);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/steps/:stepId/order', async (req, res) => {
    try {
        const step = await updateStepOrder(Number(req.params.stepId), req.body.newOrder);
        res.json(step);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router; 