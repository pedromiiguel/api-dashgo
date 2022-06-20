import { client } from "../../prisma/client";

class FindAllUsersUseCase {
  async execute() {
    const users = await client.user.findMany();

    return users;
  }
}


export { FindAllUsersUseCase };