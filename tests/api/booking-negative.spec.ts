import { buildBooking } from '../../src/data/booking.builder.js';
import { expect, test } from '../../src/fixtures/api.fixture.js';

test.describe('Booking API negative behavior', () => {
  test(
    'rejects invalid authentication credentials',
    { tag: '@regression' },
    async ({ bookerClient }) => {
      const response = await bookerClient.createToken({
        username: 'invalid-user',
        password: 'invalid-password',
      });

      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({ reason: 'Bad credentials' });
    },
  );

  test(
    'returns not found for an unknown booking',
    { tag: '@regression' },
    async ({ bookerClient }) => {
      const response = await bookerClient.getBooking(9_999_999);

      expect(response.status()).toBe(404);
    },
  );

  test(
    'rejects an update with an invalid token',
    { tag: '@regression' },
    async ({ bookerClient, temporaryBooking }) => {
      const response = await bookerClient.updateBooking(
        temporaryBooking.bookingId,
        buildBooking({ firstname: 'Unauthorized' }),
        'invalid-token',
      );

      expect(response.status()).toBe(403);
    },
  );

  test(
    'rejects deletion with an invalid token',
    { tag: '@regression' },
    async ({ bookerClient, temporaryBooking }) => {
      const response = await bookerClient.deleteBooking(
        temporaryBooking.bookingId,
        'invalid-token',
      );

      expect(response.status()).toBe(403);
    },
  );
});
