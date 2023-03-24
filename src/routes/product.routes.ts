import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import { CreateProductController } from '../modules/product/useCases/createProduct/CreateProductController';
import { EditProductController } from '../modules/product/useCases/editProduct/EditProductController';
import { FindProductsController } from '../modules/product/useCases/findAllProduct/FindProductsController';
import { DeleteProductController } from '../modules/product/useCases/deleteProduct/DeleteProductController';
import { FindProductController } from '../modules/product/useCases/findProduct/findProductController';
import { LastWeekRegisterProductCountController } from '../modules/product/useCases/lastWeekRegisterProductCount/LastWeekRegisterProductCountController';

const createProductController = new CreateProductController();
const findProductsController = new FindProductsController();
const findProductController = new FindProductController();
const editProductController = new EditProductController();
const deleteProductController = new DeleteProductController();
const lastWeekRegisterProductCountController =
  new LastWeekRegisterProductCountController();

const productRoutes = Router();

productRoutes.post('/', ensureAuthenticated, createProductController.handle);
productRoutes.get('/', ensureAuthenticated, findProductsController.handle);
productRoutes.get('/count', lastWeekRegisterProductCountController.handle);
productRoutes.get('/:id', ensureAuthenticated, findProductController.handle);
productRoutes.patch(
  '/edit/:id',
  ensureAuthenticated,
  editProductController.handle
);
productRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteProductController.handle
);

export { productRoutes };
