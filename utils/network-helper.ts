import { Page, Route } from '@playwright/test';

/**
 * NetworkHelper — Utility for network interception and API mocking
 * Used for: mocking API responses, blocking requests,
 * validating outgoing requests from UI actions
 */
export class NetworkHelper {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Mock an API endpoint with custom response
   * Usage: await networkHelper.mockAPIResponse('/api/policies', mockData)
   */
  async mockAPIResponse(
    urlPattern: string,
    mockData: object,
    statusCode: number = 200
  ): Promise<void> {
    await this.page.route(urlPattern, async (route: Route) => {
      await route.fulfill({
        status: statusCode,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    });
  }

  /**
   * Capture outgoing API request made by UI action
   * Usage: const request = await networkHelper.captureRequest('/api/submit')
   */
  async captureRequest(urlPattern: string): Promise<object> {
    return new Promise((resolve) => {
      this.page.on('request', (request) => {
        if (request.url().includes(urlPattern)) {
          resolve({
            url: request.url(),
            method: request.method(),
            headers: request.headers(),
            body: request.postData(),
          });
        }
      });
    });
  }

  /**
   * Validate API response triggered by UI action
   * Usage: const response = await networkHelper.captureResponse('/api/policy')
   */
  async captureResponse(urlPattern: string): Promise<object> {
    return new Promise((resolve) => {
      this.page.on('response', async (response) => {
        if (response.url().includes(urlPattern)) {
          const body = await response.json().catch(() => ({}));
          resolve({
            url: response.url(),
            status: response.status(),
            body,
          });
        }
      });
    });
  }

  /**
   * Block specific requests (ads, analytics, trackers)
   * Speeds up test execution significantly
   */
  async blockRequests(patterns: string[]): Promise<void> {
    for (const pattern of patterns) {
      await this.page.route(pattern, (route) => route.abort());
    }
  }
}
