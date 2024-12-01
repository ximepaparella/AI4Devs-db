import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Employee {
    id?: number;
    companyId: number;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    interviews: any[];

    constructor(data: any) {
        this.id = data.id;
        this.companyId = data.companyId;
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
        this.isActive = data.isActive ?? true;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.interviews = data.interviews || [];
    }

    async save() {
        const employeeData: any = {
            companyId: this.companyId,
            name: this.name,
            email: this.email,
            role: this.role,
            isActive: this.isActive
        };

        try {
            if (this.id) {
                return await prisma.employee.update({
                    where: { id: this.id },
                    data: employeeData
                });
            } else {
                return await prisma.employee.create({
                    data: employeeData
                });
            }
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('El email ya está registrado para otro empleado.');
            }
            throw error;
        }
    }
} 