import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Position {
    id?: number;
    companyId: number;
    interviewFlowId: number;
    title: string;
    description: string;
    status: string;
    isVisible: boolean;
    location: string;
    jobDescription: string;
    requirements: string;
    responsibilities: string;
    salaryMin: number;
    salaryMax: number;
    employmentType: string;
    benefits: string;
    companyDescription: string;
    applicationDeadline: Date;
    contactInfo: string;
    createdAt?: Date;
    updatedAt?: Date;
    applications: any[];

    constructor(data: any) {
        this.id = data.id;
        this.companyId = data.companyId;
        this.interviewFlowId = data.interviewFlowId;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status;
        this.isVisible = data.isVisible ?? true;
        this.location = data.location;
        this.jobDescription = data.jobDescription;
        this.requirements = data.requirements;
        this.responsibilities = data.responsibilities;
        this.salaryMin = data.salaryMin;
        this.salaryMax = data.salaryMax;
        this.employmentType = data.employmentType;
        this.benefits = data.benefits;
        this.companyDescription = data.companyDescription;
        this.applicationDeadline = new Date(data.applicationDeadline);
        this.contactInfo = data.contactInfo;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.applications = data.applications || [];
    }

    async save() {
        const positionData = {
            companyId: this.companyId,
            interviewFlowId: this.interviewFlowId,
            title: this.title,
            description: this.description,
            status: this.status,
            isVisible: this.isVisible,
            location: this.location,
            jobDescription: this.jobDescription,
            requirements: this.requirements,
            responsibilities: this.responsibilities,
            salaryMin: this.salaryMin,
            salaryMax: this.salaryMax,
            employmentType: this.employmentType,
            benefits: this.benefits,
            companyDescription: this.companyDescription,
            applicationDeadline: this.applicationDeadline,
            contactInfo: this.contactInfo
        };

        try {
            if (this.id) {
                return await prisma.position.update({
                    where: { id: this.id },
                    data: positionData
                });
            } else {
                return await prisma.position.create({
                    data: positionData
                });
            }
        } catch (error: any) {
            throw new Error(`Error al guardar la posición: ${error.message}`);
        }
    }
} 