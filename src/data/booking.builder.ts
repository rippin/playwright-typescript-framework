import { type Booking } from '../api/booking.schema.js';

type BookingOverrides = Omit<Partial<Booking>, 'bookingdates'> & {
  bookingdates?: Partial<Booking['bookingdates']>;
};

const defaultBooking: Booking = {
  firstname: 'Portfolio',
  lastname: 'Tester',
  totalprice: 250,
  depositpaid: true,
  bookingdates: {
    checkin: '2030-01-10',
    checkout: '2030-01-15',
  },
  additionalneeds: 'Breakfast',
};

export function buildBooking(overrides: BookingOverrides = {}): Booking {
  return {
    ...defaultBooking,
    ...overrides,
    bookingdates: {
      ...defaultBooking.bookingdates,
      ...overrides.bookingdates,
    },
  };
}
