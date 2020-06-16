import { Router } from 'express';

import Auth from '@modules/users/infra/http/middlewares/auth';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(Auth);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/schedule', providerAppointmentsController.index);

export default appointmentsRouter;
