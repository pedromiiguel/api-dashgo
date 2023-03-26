import { Request, Response } from 'express';
import { LastWeekRegisterProductCountUseCase } from './LastWeekRegisterProductCountUseCase.ts';

class LastWeekRegisterProductCountController {
  async handle(request: Request, response: Response) {
    const lastWeekRegisterProductCountUseCase =
      new LastWeekRegisterProductCountUseCase();
    const subscribersWeek = await lastWeekRegisterProductCountUseCase.execute();

    return response.json(subscribersWeek);
  }
}

export { LastWeekRegisterProductCountController };
