// import AppError from '@shared/errors/AppError';

// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('⚪️ ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    const createAppointment = (time: number): Promise<Appointment> => {
      return fakeAppointmentsRepository.create({
        provider_id: 'user',
        date: new Date(2020, 4, 20, time, 0, 0),
      });
    };
    await Promise.all([
      createAppointment(8),
      createAppointment(9),
      createAppointment(10),
      createAppointment(11),
      createAppointment(12),
      createAppointment(13),
      createAppointment(14),
      createAppointment(15),
      createAppointment(16),
      createAppointment(17),
    ]);
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });
    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
