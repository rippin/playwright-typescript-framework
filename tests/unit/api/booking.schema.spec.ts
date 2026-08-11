import { describe, expect, test } from 'vitest';

import {
  bookingSchema,
  createdBookingSchema,
  type Booking,
} from '../../../src/api/booking.schema.js';

const validBooking: Booking = {
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

describe('bookingSchema', () => {
  test('accepts a valid booking', () => {
    expect(bookingSchema.parse(validBooking)).toEqual(validBooking);
  });

  test('rejects a string total price', () => {
    const invalidBooking = {
      ...validBooking,
      totalprice: '250',
    };

    expect(() => bookingSchema.parse(invalidBooking)).toThrow();
  });

  test('rejects an invalid check-in date', () => {
    const invalidBooking = {
      ...validBooking,
      bookingdates: {
        ...validBooking.bookingdates,
        checkin: 'not-a-date',
      },
    };

    expect(() => bookingSchema.parse(invalidBooking)).toThrow();
  });

  test('rejects a missing required field', () => {
    const incompleteBooking = {
      lastname: validBooking.lastname,
      totalprice: validBooking.totalprice,
      depositpaid: validBooking.depositpaid,
      bookingdates: validBooking.bookingdates,
      additionalneeds: validBooking.additionalneeds,
    };

    expect(() => bookingSchema.parse(incompleteBooking)).toThrow();
  });
});

describe('createdBookingSchema', () => {
  test('accepts a valid create-booking response', () => {
    const responseBody = {
      bookingid: 123,
      booking: validBooking,
    };

    expect(createdBookingSchema.parse(responseBody)).toEqual(responseBody);
  });

  test('rejects a nonpositive booking ID', () => {
    const responseBody = {
      bookingid: 0,
      booking: validBooking,
    };

    expect(() => createdBookingSchema.parse(responseBody)).toThrow();
  });
});
