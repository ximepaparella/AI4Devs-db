import { Position } from '../../domain/models/Position';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addPosition = async (positionData: any) => {
    const position = new Position(positionData);
    try {
        return await position.save();
    } catch (error: any) {
        throw new Error(`Error al crear la posición: ${error.message}`);
    }
};

export const getPositionsByCompany = async (companyId: number) => {
    try {
        const positions = await prisma.position.findMany({
            where: { 
                companyId,
                isVisible: true 
            },
            include: {
                applications: true,
                interviewFlow: true
            }
        });
        return positions.map(pos => new Position(pos));
    } catch (error: any) {
        throw new Error(`Error al obtener las posiciones: ${error.message}`);
    }
};

export const updatePositionStatus = async (id: number, status: string) => {
    try {
        const position = await prisma.position.update({
            where: { id },
            data: { status }
        });
        return new Position(position);
    } catch (error: any) {
        throw new Error(`Error al actualizar el estado de la posición: ${error.message}`);
    }
}; 