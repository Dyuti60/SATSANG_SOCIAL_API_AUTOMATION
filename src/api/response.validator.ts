import { AxiosResponse } from 'axios';
import { z, ZodType } from 'zod';
import { allure } from 'allure-jest';

export default class ResponseValidator {

  // 🔹 Extract body
  private static getBody(response: AxiosResponse) {
    return response.data;
  }

  // 🔹 Attach response to Allure
  static attachResponse(response: AxiosResponse) {
    allure.attachment(
      'API Response',
      JSON.stringify(response.data, null, 2),
      'application/json'
    );
  }

  // 🔹 STATUS VALIDATION
  static validateStatus(response: AxiosResponse, expectedStatus: number) {
    allure.step(
      `Validate HTTP status: expected ${expectedStatus}, actual ${response.status}`,
      () => {
        expect(response.status).toBe(expectedStatus);
      }
    );
  }

  // 🔥 ZOD SCHEMA VALIDATION
  static validateSchema<T>(
    response: AxiosResponse,
    schema: ZodType<T>,
    options?: { status?: number; pick?: 'root' | 'data' }
  ): T {

    const body = this.getBody(response);
    this.attachResponse(response);

    if (options?.status) {
      allure.step(
        `Validate HTTP status: expected ${options.status}, actual ${response.status}`,
        () => {
          expect(response.status).toBe(options.status);
        }
      );
    }

    const target =
      options?.pick === 'data'
        ? body.data
        : options?.pick === 'root'
        ? body
        : body.data ?? body;

    const parsed = schema.safeParse(target);

    if (!parsed.success) {
      allure.step('❌ Zod Validation Failed', () => {
        console.error(JSON.stringify(parsed.error.issues, null, 2));
      });
      throw new Error('Schema validation failed');
    }

    allure.step('✅ Schema validation passed', () => {});
    return parsed.data;
  }

  // 🔴 ERROR VALIDATION
  static validateError(
    response: AxiosResponse,
    expected: {
      status: number;
      message?: string;
      error?: boolean;
    }
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    allure.step('Validate error response', () => {

      allure.step(`HTTP status: expected ${expected.status}, actual ${response.status}`, () => {
        expect(response.status).toBe(expected.status);
      });

      if (body.statusCode !== undefined) {
        allure.step(`statusCode: expected ${expected.status}, actual ${body.statusCode}`, () => {
          expect(body.statusCode).toBe(expected.status);
        });
      }

      if (expected.error !== undefined) {
        allure.step(`error flag: expected ${expected.error}, actual ${body.error}`, () => {
          expect(body.error).toBe(expected.error);
        });
      }

      if (expected.message) {
        allure.step(`message: expected "${expected.message}", actual "${body.message}"`, () => {
          expect(body.message).toBe(expected.message);
        });
      }

      if ('data' in body) {
        allure.step('Validate data is null', () => {
          expect(body.data).toBeNull();
        });
      }
    });
  }

  // 🟢 SUCCESS VALIDATION
  static validateSuccess(
    response: AxiosResponse,
    expected: {
      httpStatus: number;
      statusCode?: number;
      message?: string;
    }
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    allure.step('Validate success response', () => {

      allure.step(`HTTP status: expected ${expected.httpStatus}, actual ${response.status}`, () => {
        expect(response.status).toBe(expected.httpStatus);
      });

      if (expected.statusCode !== undefined) {
        allure.step(`statusCode: expected ${expected.statusCode}, actual ${body.statusCode}`, () => {
          expect(body.statusCode).toBe(expected.statusCode);
        });
      }

      allure.step(`error flag: expected false, actual ${body.error}`, () => {
        expect(body.error).toBe(false);
      });

      if (expected.message) {
        allure.step(`message: expected "${expected.message}", actual "${body.message}"`, () => {
          expect(body.message).toBe(expected.message);
        });
      }
    });
  }

  // 🔹 FLEXIBLE ERROR MESSAGE
  static validateErrorMessage(
    response: AxiosResponse,
    expectedMessage: string
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    const actualMessage =
      body.message ||
      body.error ||
      (Array.isArray(body.errors) ? body.errors.join(', ') : undefined) ||
      (typeof body.errors === 'object'
        ? Object.values(body.errors).join(', ')
        : undefined);

    allure.step(`Validate error message contains "${expectedMessage}"`, () => {
      expect(actualMessage).toContain(expectedMessage);
    });
  }

  // 🔹 PARTIAL VALIDATION
  static validateJsonContains(
    response: AxiosResponse,
    expectedPartial: Record<string, any>
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    Object.entries(expectedPartial).forEach(([key, value]) => {
      allure.step(`Validate field ${key}: expected ${value}, actual ${body[key]}`, () => {
        expect(body[key]).toEqual(value);
      });
    });
  }

  // 🔹 NESTED FIELD VALIDATION
  static validateNestedField(
    response: AxiosResponse,
    path: string,
    expectedValue: any
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    const value = path.split('.').reduce((acc, key) => acc?.[key], body);

    allure.step(`Validate ${path}: expected ${expectedValue}, actual ${value}`, () => {
      expect(value).toEqual(expectedValue);
    });
  }

  // 🔥 NEW: VALIDATE ANY VALUE (supports nested path)
  static validateValue(
    response: AxiosResponse,
    path: string,
    expectedValue: any
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    const actualValue = path
      .split('.')
      .reduce((acc, key) => acc?.[key], body);

    allure.step(
      `Validate value at "${path}": expected ${JSON.stringify(expectedValue)}, actual ${JSON.stringify(actualValue)}`,
      () => {
        expect(actualValue).toEqual(expectedValue);
      }
    );
  }

  // 🔥 NEW: VALIDATE COMPLETE JSON RESPONSE
  static validateFullResponse(
    response: AxiosResponse,
    expectedJson: Record<string, any>
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    allure.step('Validate complete JSON response', () => {
      expect(body).toEqual(expectedJson);
    });
  }

  // 🔥 BONUS: PARTIAL DEEP MATCH
  static validatePartialResponse(
    response: AxiosResponse,
    expectedJson: Record<string, any>
  ) {
    const body = this.getBody(response);
    this.attachResponse(response);

    allure.step('Validate partial JSON response', () => {
      expect(body).toMatchObject(expectedJson);
    });
  }
}