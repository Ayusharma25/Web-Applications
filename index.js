import express from 'express';
import ProductController from './src/controller/product.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';

const server = express();

server.use(express.urlencoded({extended: true}));

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

const productController = new ProductController();
server.get('/', productController.getProducts);
server.get('/new', productController.getAddForm);
server.post('/', productController.addNewProduct);

server.use(express.static('src/views'))

server.listen(7000, () => {
    console.log('Server is running on 7000');
});