import { Request, Response } from 'express';
import { container } from 'tsyringe';

import listProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppointments = container.resolve(
      listProviderAppointmentsService,
    );

    const appointment = await listProviderAppointments.execute({
      day,
      month,
      year,
      provider_id,
    });
    return response.json(appointment);
  }
}
