import express from 'express';
import { 
    addEmployee, 
    getEmployeesByCompany, 
    updateEmployeeStatus 
} from '../application/services/employeeService';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const employee = await addEmployee(req.body);
        res.status(201).json(employee);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/company/:companyId', async (req, res) => {
    try {
        const employees = await getEmployeesByCompany(Number(req.params.companyId));
        res.json(employees);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/:id/status', async (req, res) => {
    try {
        const employee = await updateEmployeeStatus(Number(req.params.id), req.body.isActive);
        res.json(employee);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router; 