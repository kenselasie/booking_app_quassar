import { Router } from 'express';

import AppointmentController from './controllers/appointment/crud';


const router = Router();

// Appointment routes
router.get('/appointment', AppointmentController.getAll);
router.post('/appointment', AppointmentController.add);
router.get('/appointment/:id', AppointmentController.getOne);
router.patch('/appointment/:id', AppointmentController.update);
router.delete('/appointment/:id', AppointmentController.remove);



export default router;
