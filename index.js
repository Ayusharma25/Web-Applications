import express from 'express';
import ProductController from './src/controller/product.controller.js';
import path from 'path';

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

const productController = new ProductController();
server.get('/', productController.getProducts);

server.use(express.static('src/views'))

server.listen(7000, () => {
    console.log('Server is running on 7000');
});