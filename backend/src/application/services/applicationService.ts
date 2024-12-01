import { Application } from '../../domain/models/Application';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createApplication = async (applicationData: any) => {
    const application = new Application(applicationData);
    try {
        return await application.save();
    } catch (error: any) {
        throw new Error(`Error al crear la aplicación: ${error.message}`);
    }
};

export const getApplicationsByPosition = async (positionId: number) => {
    try {
        const applications = await prisma.application.findMany({
            where: { positionId },
            include: {
                candidate: true,
                interviews: {
                    include: {
                        employee: true,
                        interviewStep: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return applications.map(app => new Application(app));
    } catch (error: any) {
        throw new Error(`Error al obtener las aplicaciones: ${error.message}`);
    }
};

export const updateApplicationStatus = async (id: number, status: string, notes?: string) => {
    try {
        const application = await prisma.application.update({
            where: { id },
            data: { 
                status,
                notes,
                updatedAt: new Date()
            }
        });
        return new Application(application);
    } catch (error: any) {
        throw new Error(`Error al actualizar el estado de la aplicación: ${error.message}`);
    }
};

export const moveApplicationToNextStep = async (id: number, nextStep: number) => {
    try {
        const application = await prisma.application.update({
            where: { id },
            data: { 
                currentStep: nextStep,
                updatedAt: new Date()
            }
        });
        return new Application(application);
    } catch (error: any) {
        throw new Error(`Error al avanzar la aplicación al siguiente paso: ${error.message}`);
    }
}; 