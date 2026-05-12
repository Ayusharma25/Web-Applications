import path from 'path';
import ProductModel from '../module/product.model.js';
import { sendProductChangeEmail } from '../services/email.service.js';

export default class ProductController{
    getProducts(req, res){
        var products = ProductModel.getAll();
        res.render("index", {products, userEmail: req.session.userEmail});
        // return res.sendFile(
        //     path.join(path.resolve(), "src", "views", "products.html")
        // )
    }

    getAddForm(req, res, next){
        return res.render("new-product", {errorMessage: null, userEmail: req.session.userEmail});
    }

    async postAddProduct(req, res, next){
        const { name, desc, price } = req.body;
        const imageUrl = 'images/' + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
        await sendProductChangeEmail({
            to: req.session.userEmail,
            action: 'Added',
            product: { name, desc, price },
        });
        var products = ProductModel.getAll();
        res.render("index", {products, userEmail: req.session.userEmail});
    }

    getUpdateProductView(req, res, next){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render("update-product", {product: productFound, errorMessage: null, userEmail: req.session.userEmail});
        }
        else{
            res.status(401).send("Product not found");
        }
    }

    async postUpdateProduct(req, res, next){
        const existingProduct = ProductModel.getById(req.body.id);
        const imageUrl = req.file ? 'images/' + req.file.filename : existingProduct.imageUrl;
        const updatedProduct = {...req.body, imageUrl};
        ProductModel.update(updatedProduct);
        await sendProductChangeEmail({
            to: req.session.userEmail,
            action: 'Updated',
            product: updatedProduct,
        });
        var products = ProductModel.getAll();
        res.render("index", {products, userEmail: req.session.userEmail});
    }

    async deleteProduct(req, res, next){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("Product not found");
        }
        ProductModel.delete(id);
        await sendProductChangeEmail({
            to: req.session.userEmail,
            action: 'Deleted',
            product: productFound,
        });
        var products = ProductModel.getAll();
        res.render("index", {products, userEmail: req.session.userEmail});
    }
}
