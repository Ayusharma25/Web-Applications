import path from 'path';
import ProductModel from '../module/product.model.js';

export default class ProductController{
    getProducts(req, res){
        var products = ProductModel.getAll();
        res.render("index", {products});
        // return res.sendFile(
        //     path.join(path.resolve(), "src", "views", "products.html")
        // )
    }

    getAddForm(req, res, next){
        return res.render("new-product", {errorMessage: null});
    }

    postAddProduct(req, res, next){
        const { name, desc, price } = req.body;
        const imageUrl = 'images/' + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
        var products = ProductModel.getAll();
        res.render("index", {products});
    }

    getUpdateProductView(req, res, next){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render("update-product", {product: productFound, errorMessage: null});
        }
        else{
            res.status(401).send("Product not found");
        }
    }

    postUpdateProduct(req, res, next){
        ProductModel.update(req.body);
        var products = ProductModel.getAll();
        res.render("index", {products});
    }

    deleteProduct(req, res, next){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("Product not found");
        }
        ProductModel.delete(id);
        var products = ProductModel.getAll();
        res.render("index", {products});
    }
}