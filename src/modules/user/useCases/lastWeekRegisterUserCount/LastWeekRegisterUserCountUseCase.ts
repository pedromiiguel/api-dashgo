import dayjs from 'dayjs';
import { client } from '../../../../prisma/client';


class LastWeekRegisterUserCountUseCase {
  async execute() {
    const today = dayjs();

    const startDate = today.subtract(7, 'day').startOf('day').toDate();
    const endDate = today.endOf('day').toDate();

    const count = await client.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        createdAt: true,
      },
    });

    const subscribersWeek = count.reduce((acc, item) => {
      const count = item._count.createdAt;
      const formattedDate = dayjs(item.createdAt).format('DD/MM/YYYY');

      const existingItem = acc.find((obj) => {
        const existingDate = Object.keys(obj)[0];

        return existingDate === formattedDate;
      });

      if (existingItem) {
        existingItem[formattedDate] += count;
      } else {
        const newObj = {};
        newObj[formattedDate] = count;
        acc.push(newObj);
      }
      return acc;
    }, []);

    return { subscribersWeek };
  }
}

export { LastWeekRegisterUserCountUseCase };
