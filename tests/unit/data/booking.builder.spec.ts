import { describe, expect, test } from 'vitest';

import { type Booking } from '../../../src/api/booking.schema.js';
import { buildBooking } from '../../../src/data/booking.builder.js';

const expectedDefaultBooking: Booking = {
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

describe('buildBooking', () => {
  test('returns the default booking', () => {
    expect(buildBooking()).toEqual(expectedDefaultBooking);
  });

  test('overrides a top-level property', () => {
    expect(buildBooking({ firstname: 'Eric' })).toEqual({
      ...expectedDefaultBooking,
      firstname: 'Eric',
    });
  });

  test('overrides one booking date while retaining the other', () => {
    expect(
      buildBooking({
        bookingdates: {
          checkout: '2030-02-01',
        },
      }),
    ).toEqual({
      ...expectedDefaultBooking,
      bookingdates: {
        checkin: '2030-01-10',
        checkout: '2030-02-01',
      },
    });
  });

  test('does not share mutable data between calls', () => {
    const firstBooking = buildBooking();

    firstBooking.firstname = 'Changed';
    firstBooking.bookingdates.checkin = '2040-01-01';

    expect(buildBooking()).toEqual(expectedDefaultBooking);
  });
});
