import { type APIRequestContext, type APIResponse } from '@playwright/test';

import { type Booking } from './booking.schema.js';

export interface BookerCredentials {
  username: string;
  password: string;
}

export class BookerClient {
  constructor(private readonly request: APIRequestContext) {}

  async createToken(credentials: BookerCredentials): Promise<APIResponse> {
    return this.request.post('/auth', { data: credentials });
  }

  async createBooking(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }

  async getBooking(bookingId: number): Promise<APIResponse> {
    return this.request.get(`/booking/${bookingId}`);
  }

  async updateBooking(bookingId: number, booking: Booking, token: string): Promise<APIResponse> {
    return this.request.put(`/booking/${bookingId}`, {
      data: booking,
      headers: this.authenticationHeaders(token),
    });
  }

  async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${bookingId}`, {
      headers: this.authenticationHeaders(token),
    });
  }

  private authenticationHeaders(token: string): Record<string, string> {
    return {
      Accept: 'application/json',
      Cookie: `token=${token}`,
    };
  }
}
