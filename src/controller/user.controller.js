import UserModel from "../module/user.model.js";
import ProductModel from "../module/product.model.js";

export default class UserController{
    getRegister(req, res){
        res.render("register");
    }

    getLogin(req, res){
        res.render("login", {errorMessage: null});
    }

    postRegister(req, res){
        const { name, email, password } = req.body;
        UserModel.add(name, email, password);
        res.render('login', {errorMessage: null});
    }

    postLogin(req, res){
        const { email, password } = req.body;
        const user = UserModel.isValidUser(email, password);
        if(!user){
            return res.render("login", {errorMessage: "Invalid email or password"});
        }
        req.session.userEmail = email;
        var products = ProductModel.getAll();
        return res.render("index", {products});
    }
}