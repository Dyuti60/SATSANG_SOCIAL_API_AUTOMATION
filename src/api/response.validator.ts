import { AxiosResponse } from 'axios';
import { ZodType } from 'zod';
import { allure } from '../utils/allure';

export default class ResponseValidator {

  // 🔹 Extract body
  private static getBody(response: AxiosResponse) {
    return response?.data;
  }

  // 🔹 Attach response to Allure
  static attachResponse(response: AxiosResponse) {
    allure.attachment(
      'API Response',
      JSON.stringify(response?.data, null, 2),
      'application/json'
    );
  }

  // 🔹 STATUS VALIDATION
  static async validateStatus(response: AxiosResponse, expectedStatus: number) {
    await allure.step(
      `Validate HTTP status: expected ${expectedStatus}, actual ${response?.status}`,
      async () => {
        expect(response?.status).toBe(expectedStatus);
      }
    );
  }

  // 🔥 ZOD SCHEMA VALIDATION
  static async validateSchema<T>(
    response: AxiosResponse,
    schema: ZodType<T>,
    options?: { status?: number; pick?: 'root' | 'data' }
  ): Promise<T> {

    const body = this.getBody(response);
    this.attachResponse(response);

    if (options?.status) {
      await allure.step(
        `Validate HTTP status: expected ${options.status}, actual ${response?.status}`,
        async () => {
          expect(response?.status).toBe(options.status);
        }
      );
    }

    const target =
      options?.pick === 'data'
        ? body?.data
        : options?.pick === 'root'
        ? body
        : body?.data ?? body;

    const parsed = schema.safeParse(target);

    if (!parsed.success) {
      await allure.step('❌ Zod Validation Failed', async () => {
        console.error(JSON.stringify(parsed.error.issues, null, 2));
      });
      throw new Error('Schema validation failed');
    }

    await allure.step('✅ Schema validation passed', async () => {});
    return parsed.data;
  }

  // 🔴 ERROR VALIDATION
  static async validateError(
    response: AxiosResponse,
    expected: {
      status: number;
      message?: string;
      error?: boolean;
    }
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    await allure.step('Validate error response', async () => {

      await allure.step(
        `HTTP status: expected ${expected.status}, actual ${response?.status}`,
        async () => {
          expect(response?.status).toBe(expected.status);
        }
      );

      if (body?.statusCode !== undefined) {
        await allure.step(
          `statusCode: expected ${expected.status}, actual ${body.statusCode}`,
          async () => {
            expect(body.statusCode).toBe(expected.status);
          }
        );
      }

      if (expected.error !== undefined) {
        await allure.step(
          `error flag: expected ${expected.error}, actual ${body?.error}`,
          async () => {
            expect(body?.error).toBe(expected.error);
          }
        );
      }

      if (expected.message) {
        await allure.step(
          `message: expected "${expected.message}", actual "${body?.message}"`,
          async () => {
            expect(body?.message).toBe(expected.message);
          }
        );
      }

      if (body && 'data' in body) {
        await allure.step('Validate data is null', async () => {
          expect(body.data).toBeNull();
        });
      }
    });
  }

  // 🟢 SUCCESS VALIDATION
  static async validateSuccess(
    response: AxiosResponse,
    expected: {
      httpStatus: number;
      statusCode?: number;
      message?: string;
    }
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    await allure.step('Validate success response', async () => {

      await allure.step(
        `HTTP status: expected ${expected.httpStatus}, actual ${response?.status}`,
        async () => {
          expect(response?.status).toBe(expected.httpStatus);
        }
      );

      if (expected.statusCode !== undefined) {
        await allure.step(
          `statusCode: expected ${expected.statusCode}, actual ${body?.statusCode}`,
          async () => {
            expect(body?.statusCode).toBe(expected.statusCode);
          }
        );
      }

      await allure.step(
        `error flag: expected false, actual ${body?.error}`,
        async () => {
          expect(body?.error).toBe(false);
        }
      );

      if (expected.message) {
        await allure.step(
          `message: expected "${expected.message}", actual "${body?.message}"`,
          async () => {
            expect(body?.message).toBe(expected.message);
          }
        );
      }
    });
  }

  // 🔹 FLEXIBLE ERROR MESSAGE
static async validateErrorMessage(
  response: AxiosResponse,
  expectedMessage: string
) {
  const body = this.getBody(response);
  this.attachResponse(response);

  if (!expectedMessage || expectedMessage.trim() === '') {
    throw new Error('Expected message cannot be empty');
  }

  const actualMessage =
    body?.message ||
    body?.error ||
    (Array.isArray(body?.errors) ? body.errors.join(', ') : undefined) ||
    (typeof body?.errors === 'object'
      ? Object.values(body.errors).join(', ')
      : undefined);

  await allure.step(
    `Validate error message contains "${expectedMessage}"`,
    async () => {
      expect(actualMessage).toContain(expectedMessage);
    }
  );
}

  // 🔹 PARTIAL VALIDATION
  static async validateJsonContains(
    response: AxiosResponse,
    expectedPartial: Record<string, any>
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    for (const [key, value] of Object.entries(expectedPartial)) {
      await allure.step(
        `Validate field ${key}: expected ${value}, actual ${body?.[key]}`,
        async () => {
          expect(body?.[key]).toEqual(value);
        }
      );
    }
  }

  // 🔹 NESTED FIELD VALIDATION
  static async validateNestedField(
    response: AxiosResponse,
    path: string,
    expectedValue: any
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    const value = path.split('.').reduce((acc, key) => acc?.[key], body);

    await allure.step(
      `Validate ${path}: expected ${expectedValue}, actual ${value}`,
      async () => {
        expect(value).toEqual(expectedValue);
      }
    );
  }

  // 🔥 VALIDATE ANY VALUE
  static async validateValue(
    response: AxiosResponse,
    path: string,
    expectedValue: any
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    const actualValue = path.split('.').reduce((acc, key) => acc?.[key], body);

    await allure.step(
      `Validate value at "${path}"`,
      async () => {
        expect(actualValue).toEqual(expectedValue);
      }
    );
  }

  // 🔥 FULL RESPONSE VALIDATION
  static async validateFullResponse(
    response: AxiosResponse,
    expectedJson: Record<string, any>
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    await allure.step('Validate complete JSON response', async () => {
      expect(body).toEqual(expectedJson);
    });
  }

  // 🔥 PARTIAL MATCH
  static async validatePartialResponse(
    response: AxiosResponse,
    expectedJson: Record<string, any>
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    await allure.step('Validate partial JSON response', async () => {
      expect(body).toMatchObject(expectedJson);
    });
  }
}