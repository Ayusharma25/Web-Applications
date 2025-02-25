import path from 'path';
import ProductModel from '../module/product.model.js';

export default class ProductController{
    getProducts(req, res){
        let products = ProductModel.get();
        res.render("products", {products:products});
        // return res.sendFile(
        //     path.join(path.resolve(), "src", "views", "products.html")
        // )
    }

    getAddForm(req, res){
        return res.render("new-product");
    }

    addNewProduct(req, res){
        console.log(req.body);
        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render("products", {products});
    }
}