import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { Company } from '../../domain/models/Company';

export const addCompany = async (companyData: any) => {
    const company = new Company(companyData);
    try {
        const savedCompany = await company.save();
        return savedCompany;
    } catch (error: any) {
        throw new Error(`Error al crear la compañía: ${error.message}`);
    }
};

export const getCompanyById = async (id: number) => {
    try {
        const company = await prisma.company.findUnique({
            where: { id },
            include: {
                employees: true,
                positions: true
            }
        });
        return company ? new Company(company) : null;
    } catch (error: any) {
        throw new Error(`Error al obtener la compañía: ${error.message}`);
    }
}; 