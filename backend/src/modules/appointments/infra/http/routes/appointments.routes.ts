import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import Auth from '@modules/users/infra/http/middlewares/auth';

const appointmentsRouter = Router();

appointmentsRouter.use(Auth);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const formattedDate = parseISO(date);
  const createAppointment = container.resolve(CreateAppointmentService);
  const appointment = await createAppointment.execute({
    date: formattedDate,
    provider_id,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
