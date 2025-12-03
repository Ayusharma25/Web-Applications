import path from 'path';
import ProductModel from '../module/product.model.js';

export default class ProductController{
    getProducts(req, res){
        let products = ProductModel.getAll();
        res.render("index", {products});
        // return res.sendFile(
        //     path.join(path.resolve(), "src", "views", "products.html")
        // )
    }

    getAddForm(req, res, next){
        return res.render("new-product", {errorMessage: null});
    }

    postAddProduct(req, res, next){
        ProductModel.add(req.body);
        var products = ProductModel.getAll();
        res.render("index", {products});
    }
}