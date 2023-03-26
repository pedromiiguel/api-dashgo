import { client } from '../../../../prisma/client';

interface IDeleteUserResquest {
  id: string;
}

class DeleteUserUseCase {
  async execute({ id }: IDeleteUserResquest) {
    try {
     const user =  await client.user.delete({
        where: {
          id,
        },
      });

      return user
    } catch (error) {
      console.log(error);
    }

  }
}

export { DeleteUserUseCase };
