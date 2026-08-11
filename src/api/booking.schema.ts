import { z } from 'zod';

export const bookingDatesSchema = z.object({
  checkin: z.iso.date(),
  checkout: z.iso.date(),
});

export const bookingSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  totalprice: z.number().int().nonnegative(),
  depositpaid: z.boolean(),
  bookingdates: bookingDatesSchema,
  additionalneeds: z.string().min(1),
});

export const createdBookingSchema = z.object({
  bookingid: z.number().int().positive(),
  booking: bookingSchema,
});

export const authenticationTokenSchema = z.object({
  token: z.string().min(1),
});

export type BookingDates = z.infer<typeof bookingDatesSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type CreatedBooking = z.infer<typeof createdBookingSchema>;
