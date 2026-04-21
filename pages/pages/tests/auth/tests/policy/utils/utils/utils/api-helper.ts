import { APIRequestContext, expect } from '@playwright/test';

/**
 * APIHelper — Utility for API request/response validation
 * Used for: backend verification, API-only tests, data setup via API
 */
export class APIHelper {
  private request: APIRequestContext;
  private baseURL: string;
  private authToken: string;

  constructor(request: APIRequestContext, baseURL: string, authToken: string) {
    this.request = request;
    this.baseURL = baseURL;
    this.authToken = authToken;
  }

  // GET request with auth header
  async get(endpoint: string) {
    const response = await this.request.get(`${this.baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        'Content-Type': 'application/json',
      },
    });
    expect(response.status()).toBe(200);
    return await response.json();
  }

  // POST request with body
  async post(endpoint: string, body: object) {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        'Content-Type': 'application/json',
      },
      data: body,
    });
    return { status: response.status(), body: await response.json() };
  }

  // Validate response schema keys exist
  validateResponseKeys(responseBody: object, expectedKeys: string[]) {
    expectedKeys.forEach((key) => {
      expect(responseBody).toHaveProperty(key);
    });
  }
}
