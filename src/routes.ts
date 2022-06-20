import { Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticate';
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { FindAllUsersController } from './useCases/findAllUsers/FindAllUsersController';
import { FindUserController } from './useCases/findUser/FindUserController';
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController';

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const findUserController = new FindUserController();
const findAllUsersController = new FindAllUsersController();

router.post('/users', createUserController.handle);
router.get('/users', findAllUsersController.handle);

router.post('/login', authenticateUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);
router.get('/user/:id', ensureAuthenticated, findUserController.handle);

router.get('/courses', ensureAuthenticated, (request, response) => {
  return response.json([
    { id: 1, name: 'NodeJs' },
    { id: 2, name: 'ReactJs' },
    { id: 3, name: 'React Native' },
    { id: 4, name: 'Flutter' },
    { id: 5, name: 'Elixir' },
  ]);
});

export { router };
