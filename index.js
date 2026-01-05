import express from 'express';
import ProductController from './src/controller/product.controller.js';
import UserController from './src/controller/user.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadfile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';

const server = express();

server.use(express.static('public'));
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

const productController = new ProductController();

const usersController = new UserController();

server.get('/register', usersController.getRegister);

server.get('/login', usersController.getLogin);

server.post('/login', usersController.postLogin);

server.get('/logout', usersController.logout);

server.post('/register', usersController.postRegister);

server.get('/update-product/:id', productController.getUpdateProductView);

server.get('/', auth, productController.getProducts);

server.get('/new', auth, productController.getAddForm);

server.post('/delete-product/:id', auth, productController.deleteProduct);

server.post('/', auth, uploadfile.single('imageUrl'), validationMiddleware, productController.postAddProduct);

server.post("/update-product", auth, uploadfile.single('imageUrl'), productController.postUpdateProduct);

server.use(express.static(path.join(path.resolve(), 'src', 'views')));

server.listen(7000, () => {
    console.log('Server is running on 7000');
});