import { InterviewStep } from '../../domain/models/InterviewStep';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addInterviewStep = async (stepData: any) => {
    const step = new InterviewStep(stepData);
    try {
        return await step.save();
    } catch (error: any) {
        throw new Error(`Error al crear el paso de entrevista: ${error.message}`);
    }
};

export const getInterviewStepsByFlow = async (flowId: number) => {
    try {
        const steps = await prisma.interviewStep.findMany({
            where: { 
                interviewFlowId: flowId 
            },
            orderBy: {
                orderIndex: 'asc'
            },
            include: {
                interviews: true
            }
        });
        return steps.map(step => new InterviewStep(step));
    } catch (error: any) {
        throw new Error(`Error al obtener los pasos de entrevista: ${error.message}`);
    }
};

export const updateStepOrder = async (stepId: number, newOrder: number) => {
    try {
        const step = await prisma.interviewStep.update({
            where: { id: stepId },
            data: { orderIndex: newOrder }
        });
        return new InterviewStep(step);
    } catch (error: any) {
        throw new Error(`Error al actualizar el orden del paso: ${error.message}`);
    }
}; 