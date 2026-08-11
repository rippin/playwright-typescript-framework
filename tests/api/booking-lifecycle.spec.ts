import {
  authenticationTokenSchema,
  bookingSchema,
  createdBookingSchema,
} from '../../src/api/booking.schema.js';
import { environment } from '../../src/config/environment.js';
import { buildBooking } from '../../src/data/booking.builder.js';
import { expect, test } from '../../src/fixtures/api.fixture.js';

test(
  'booking supports a complete CRUD lifecycle',
  { tag: '@regression' },
  async ({ bookerClient }) => {
    const originalBooking = buildBooking();
    const updatedBooking = buildBooking({
      firstname: 'Updated',
      totalprice: 325,
      depositpaid: false,
    });

    const authenticationResponse = await bookerClient.createToken({
      username: environment.BOOKER_USERNAME,
      password: environment.BOOKER_PASSWORD,
    });

    expect(authenticationResponse.status()).toBe(200);
    const { token } = authenticationTokenSchema.parse(await authenticationResponse.json());

    let bookingId: number | undefined;

    try {
      const createResponse = await bookerClient.createBooking(originalBooking);

      expect(createResponse.status()).toBe(200);
      const createdBooking = createdBookingSchema.parse(await createResponse.json());
      bookingId = createdBooking.bookingid;
      expect(createdBooking.booking).toEqual(originalBooking);

      const getResponse = await bookerClient.getBooking(bookingId);

      expect(getResponse.status()).toBe(200);
      expect(bookingSchema.parse(await getResponse.json())).toEqual(originalBooking);

      const updateResponse = await bookerClient.updateBooking(bookingId, updatedBooking, token);

      expect(updateResponse.status()).toBe(200);
      expect(bookingSchema.parse(await updateResponse.json())).toEqual(updatedBooking);

      const persistedBookingResponse = await bookerClient.getBooking(bookingId);

      expect(persistedBookingResponse.status()).toBe(200);
      expect(bookingSchema.parse(await persistedBookingResponse.json())).toEqual(updatedBooking);

      const deleteResponse = await bookerClient.deleteBooking(bookingId, token);

      expect(deleteResponse.status()).toBe(201);
      bookingId = undefined;

      const deletedBookingResponse = await bookerClient.getBooking(createdBooking.bookingid);

      expect(deletedBookingResponse.status()).toBe(404);
    } finally {
      // oxlint-disable-next-line playwright/no-conditional-in-test -- Cleanup is only possible after creation returns an ID.
      if (bookingId !== undefined) {
        await bookerClient.deleteBooking(bookingId, token);
      }
    }
  },
);
