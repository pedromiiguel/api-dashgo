import { Request, Response } from 'express';
import { LastWeekRegisterUserCountUseCase } from './LastWeekRegisterUserCountUseCase';

class LastWeekRegisterUserCountController {
  async handle(request: Request, response: Response) {
    const lastWeekRegisterUserCountUseCase =
      new LastWeekRegisterUserCountUseCase();
    const subscribersWeek = await lastWeekRegisterUserCountUseCase.execute();

    return response.json(subscribersWeek);
  }
}

export { LastWeekRegisterUserCountController };
