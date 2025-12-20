import express from 'express';
import ProductController from './src/controller/product.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadfile } from './src/middlewares/file-upload.middleware.js';

const server = express();

server.use(express.static('public'));

server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

const productController = new ProductController();

server.get('/update-product/:id', productController.getUpdateProductView);

server.get('/', productController.getProducts);

server.get('/new', productController.getAddForm);

server.post('/delete-product/:id', productController.deleteProduct);

server.post('/', uploadfile.single('imageUrl'), validationMiddleware, productController.postAddProduct);

server.post("/update-product", uploadfile.single('imageUrl'), productController.postUpdateProduct);

server.use(express.static(path.join(path.resolve(), 'src', 'views')));

server.listen(7000, () => {
    console.log('Server is running on 7000');
});