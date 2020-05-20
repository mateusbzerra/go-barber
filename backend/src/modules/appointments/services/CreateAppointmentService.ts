import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentDTO from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentDTO) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const parsedDate = startOfHour(date);
    const findAppointmentInTheSameDate = await this.appointmentsRepository.findByDate(
      parsedDate,
    );
    if (findAppointmentInTheSameDate) {
      throw new AppError('This appointment is already booked');
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: parsedDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
