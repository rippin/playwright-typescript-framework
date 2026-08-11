import { expect, test as base } from '@playwright/test';

import { BookerClient } from '../api/booker.client.js';
import {
  authenticationTokenSchema,
  createdBookingSchema,
  type Booking,
} from '../api/booking.schema.js';
import { environment } from '../config/environment.js';
import { buildBooking } from '../data/booking.builder.js';

interface TemporaryBooking {
  bookingId: number;
  booking: Booking;
}

interface ApiFixtures {
  bookerClient: BookerClient;
  authToken: string;
  temporaryBooking: TemporaryBooking;
}

export const test = base.extend<ApiFixtures>({
  bookerClient: async ({ request }, use) => {
    await use(new BookerClient(request));
  },
  authToken: async ({ bookerClient }, use) => {
    const response = await bookerClient.createToken({
      username: environment.BOOKER_USERNAME,
      password: environment.BOOKER_PASSWORD,
    });

    expect(response.status()).toBe(200);
    const { token } = authenticationTokenSchema.parse(await response.json());

    await use(token);
  },
  temporaryBooking: async ({ authToken, bookerClient }, use) => {
    const booking = buildBooking();
    const response = await bookerClient.createBooking(booking);

    expect(response.status()).toBe(200);
    const { bookingid: bookingId } = createdBookingSchema.parse(await response.json());

    await use({ bookingId, booking });

    const cleanupResponse = await bookerClient.deleteBooking(bookingId, authToken);
    expect(cleanupResponse.status()).toBe(201);
  },
});

export { expect };
