import { allure } from 'src/utils/allure';

export class AllureHelper {

  static async step<T>(
    message: string,
    action: () => Promise<T>
  ): Promise<T> {
    return await allure.step(message, action);
  }

  static async log(message: string): Promise<void> {
    await allure.step(message, async () => {});
  }
}