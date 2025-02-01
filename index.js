import express from 'express';
import ProductController from './src/controllers/product.controller.js';

const server = express();

server.get('/');

server.use(express.static('src/views'))

server.listen(7000, () => {
    console.log('Server is running on 7000');
});