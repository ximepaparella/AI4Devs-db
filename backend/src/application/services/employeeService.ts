import { Employee } from '../../domain/models/Employee';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addEmployee = async (employeeData: any) => {
    const employee = new Employee(employeeData);
    try {
        return await employee.save();
    } catch (error: any) {
        throw new Error(`Error al crear el empleado: ${error.message}`);
    }
};

export const getEmployeesByCompany = async (companyId: number) => {
    try {
        const employees = await prisma.employee.findMany({
            where: { 
                companyId,
                isActive: true 
            },
            include: {
                interviews: true
            }
        });
        return employees.map(emp => new Employee(emp));
    } catch (error: any) {
        throw new Error(`Error al obtener los empleados: ${error.message}`);
    }
};

export const updateEmployeeStatus = async (id: number, isActive: boolean) => {
    try {
        const employee = await prisma.employee.update({
            where: { id },
            data: { isActive }
        });
        return new Employee(employee);
    } catch (error: any) {
        throw new Error(`Error al actualizar el estado del empleado: ${error.message}`);
    }
}; 