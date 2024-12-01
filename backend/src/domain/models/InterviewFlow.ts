import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class InterviewFlow {
    id?: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    steps: any[];
    positions: any[];

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.isActive = data.isActive ?? true;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.steps = data.steps || [];
        this.positions = data.positions || [];
    }

    async save() {
        const flowData = {
            name: this.name,
            description: this.description,
            isActive: this.isActive
        };

        try {
            if (this.id) {
                return await prisma.interviewFlow.update({
                    where: { id: this.id },
                    data: flowData
                });
            } else {
                return await prisma.interviewFlow.create({
                    data: flowData
                });
            }
        } catch (error: any) {
            throw new Error(`Error al guardar el flujo de entrevista: ${error.message}`);
        }
    }
} 