import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Company {
    id?: number;
    name: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    employees: any[];
    positions: any[];

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.isActive = data.isActive ?? true;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.employees = data.employees || [];
        this.positions = data.positions || [];
    }

    async save() {
        const companyData: any = {
            name: this.name,
            isActive: this.isActive,
        };

        if (this.id) {
            return await prisma.company.update({
                where: { id: this.id },
                data: companyData
            });
        } else {
            return await prisma.company.create({
                data: companyData
            });
        }
    }
} 