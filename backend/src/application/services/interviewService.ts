import { Interview } from '../../domain/models/Interview';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const scheduleInterview = async (interviewData: any) => {
    const interview = new Interview(interviewData);
    try {
        return await interview.save();
    } catch (error: any) {
        throw new Error(`Error al programar la entrevista: ${error.message}`);
    }
};

export const getInterviewsByApplication = async (applicationId: number) => {
    try {
        const interviews = await prisma.interview.findMany({
            where: { applicationId },
            include: {
                employee: true,
                interviewStep: true
            },
            orderBy: {
                scheduledDate: 'asc'
            }
        });
        return interviews.map(int => new Interview(int));
    } catch (error: any) {
        throw new Error(`Error al obtener las entrevistas: ${error.message}`);
    }
};

export const updateInterviewFeedback = async (id: number, feedback: string, score: number) => {
    try {
        const interview = await prisma.interview.update({
            where: { id },
            data: { 
                feedback,
                score,
                status: 'COMPLETED'
            }
        });
        return new Interview(interview);
    } catch (error: any) {
        throw new Error(`Error al actualizar el feedback de la entrevista: ${error.message}`);
    }
}; 