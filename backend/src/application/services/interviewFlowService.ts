import { InterviewFlow } from '../../domain/models/InterviewFlow';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addInterviewFlow = async (flowData: any) => {
    const flow = new InterviewFlow(flowData);
    try {
        return await flow.save();
    } catch (error: any) {
        throw new Error(`Error al crear el flujo de entrevista: ${error.message}`);
    }
};

export const getInterviewFlowWithSteps = async (id: number) => {
    try {
        const flow = await prisma.interviewFlow.findUnique({
            where: { id },
            include: {
                steps: {
                    include: {
                        interviewType: true
                    },
                    orderBy: {
                        orderIndex: 'asc'
                    }
                }
            }
        });
        return flow ? new InterviewFlow(flow) : null;
    } catch (error: any) {
        throw new Error(`Error al obtener el flujo de entrevista: ${error.message}`);
    }
};

export const updateInterviewFlowStatus = async (id: number, isActive: boolean) => {
    try {
        const flow = await prisma.interviewFlow.update({
            where: { id },
            data: { isActive }
        });
        return new InterviewFlow(flow);
    } catch (error: any) {
        throw new Error(`Error al actualizar el estado del flujo: ${error.message}`);
    }
}; 