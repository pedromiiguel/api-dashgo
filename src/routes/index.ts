import { Router } from 'express';
import { authenticateRouter } from './authenticate.routes';

import { productRoutes } from './product.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/', authenticateRouter)
routes.use('/user', userRoutes);
routes.use('/product', productRoutes);

export { routes };
