import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import { CreateUserController } from '../modules/user/useCases/createUser/CreateUserController';
import { EditUserController } from '../modules/user/useCases/editUser/EditUserController';
import { FindAllUsersController } from '../modules/user/useCases/findAllUsers/FindAllUsersController';
import { FindUserController } from '../modules/user/useCases/findUser/FindUserController';
import { DeleteUserController } from '../modules/user/useCases/deleteUser/DeleteUserController';
import { LastWeekRegisterUserCountController } from '../modules/user/useCases/lastWeekRegisterUserCount/LastWeekRegisterUserCountController';


const createUserController = new CreateUserController();
const findAllUsersController = new FindAllUsersController();
const findUserController = new FindUserController();
const editUserController = new EditUserController();
const deleteUserController = new DeleteUserController();
const lastWeekRegisterUserCountController =
  new LastWeekRegisterUserCountController();

const userRoutes = Router();

userRoutes.post('/', createUserController.handle);
userRoutes.get('/', findAllUsersController.handle);
userRoutes.get('/count', lastWeekRegisterUserCountController.handle);
userRoutes.get('/:id', ensureAuthenticated, findUserController.handle);
userRoutes.patch('/edit/:id', ensureAuthenticated, editUserController.handle);
userRoutes.delete('/:id', ensureAuthenticated, deleteUserController.handle);

export { userRoutes };
