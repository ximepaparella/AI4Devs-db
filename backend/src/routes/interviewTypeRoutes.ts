import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    try {
        const interviewType = await prisma.interviewType.create({
            data: {
                name: req.body.name,
                description: req.body.description
            }
        });
        res.status(201).json(interviewType);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const types = await prisma.interviewType.findMany();
        res.json(types);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router; 