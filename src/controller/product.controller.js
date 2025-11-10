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

    addNewProduct(req, res, next){
        const {name, price, imageUrl} = req.body;
        let errors = [];
        if(!name || name.trim() == ''){
            errors.push("Name is required");
        }
        if(!price || parseFloat(price) < 1){
            errors.push("Price should be positive value");
        }
        try{
            const validUrl = new URL(imageUrl);
        }catch(err){
            errors.push("Image URL is not valid");
        }

        if(errors.length > 0){
            return res.render("new-product", {errorMessage: errors[0]});
        }
        ProductModel.add(req.body);
        var products = ProductModel.getAll();
        res.render("index", {products});
    }
}