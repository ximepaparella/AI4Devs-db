import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Application {
    id?: number;
    positionId: number;
    candidateId: number;
    status: string;
    currentStep?: number;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    interviews: any[];

    constructor(data: any) {
        this.id = data.id;
        this.positionId = data.positionId;
        this.candidateId = data.candidateId;
        this.status = data.status || 'PENDING';
        this.currentStep = data.currentStep;
        this.notes = data.notes;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.interviews = data.interviews || [];
    }

    async save() {
        const applicationData = {
            positionId: this.positionId,
            candidateId: this.candidateId,
            status: this.status,
            currentStep: this.currentStep,
            notes: this.notes
        };

        try {
            if (this.id) {
                return await prisma.application.update({
                    where: { id: this.id },
                    data: applicationData
                });
            } else {
                return await prisma.application.create({
                    data: applicationData
                });
            }
        } catch (error: any) {
            throw new Error(`Error al guardar la aplicación: ${error.message}`);
        }
    }
} 