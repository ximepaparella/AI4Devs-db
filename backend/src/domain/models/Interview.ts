import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Interview {
    id?: number;
    applicationId: number;
    interviewStepId: number;
    employeeId: number;
    scheduledDate: Date;
    duration: number;
    status: string;
    feedback?: string;
    score?: number;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: any) {
        this.id = data.id;
        this.applicationId = data.applicationId;
        this.interviewStepId = data.interviewStepId;
        this.employeeId = data.employeeId;
        this.scheduledDate = new Date(data.scheduledDate);
        this.duration = data.duration;
        this.status = data.status;
        this.feedback = data.feedback;
        this.score = data.score;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    async save() {
        const interviewData = {
            applicationId: this.applicationId,
            interviewStepId: this.interviewStepId,
            employeeId: this.employeeId,
            scheduledDate: this.scheduledDate,
            duration: this.duration,
            status: this.status,
            feedback: this.feedback,
            score: this.score
        };

        try {
            if (this.id) {
                return await prisma.interview.update({
                    where: { id: this.id },
                    data: interviewData
                });
            } else {
                return await prisma.interview.create({
                    data: interviewData
                });
            }
        } catch (error: any) {
            throw new Error(`Error al guardar la entrevista: ${error.message}`);
        }
    }
} 