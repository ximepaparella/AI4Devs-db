import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class InterviewStep {
    id?: number;
    interviewFlowId: number;
    interviewTypeId: number;
    name: string;
    description: string;
    duration: number;
    orderIndex: number;
    isRequired: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    interviews: any[];

    constructor(data: any) {
        this.id = data.id;
        this.interviewFlowId = data.interviewFlowId;
        this.interviewTypeId = data.interviewTypeId;
        this.name = data.name;
        this.description = data.description;
        this.duration = data.duration;
        this.orderIndex = data.orderIndex;
        this.isRequired = data.isRequired ?? true;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.interviews = data.interviews || [];
    }

    async save() {
        const stepData = {
            interviewFlowId: this.interviewFlowId,
            interviewTypeId: this.interviewTypeId,
            name: this.name,
            description: this.description,
            duration: this.duration,
            orderIndex: this.orderIndex,
            isRequired: this.isRequired
        };

        try {
            if (this.id) {
                return await prisma.interviewStep.update({
                    where: { id: this.id },
                    data: stepData
                });
            } else {
                return await prisma.interviewStep.create({
                    data: stepData
                });
            }
        } catch (error: any) {
            throw new Error(`Error al guardar el paso de entrevista: ${error.message}`);
        }
    }
} 