import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    try {
        const position = await prisma.position.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                requirements: req.body.requirements,
                isActive: true
            }
        });
        res.status(201).json(position);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const positions = await prisma.position.findMany({
            where: { isActive: true }
        });
        res.json(positions);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router; 