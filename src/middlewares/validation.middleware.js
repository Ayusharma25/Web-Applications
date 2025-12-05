import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
    const rules = [
        body("name").isEmpty().withMessage("Name is required"),
        body("price").isFloat({ gt: 0 }).withMessage("Price must be a number greater than 0"),
        body("imageUrl").isURL().withMessage("Image URL must be a valid URL"),
    ];

    await Promise.all(rules.map(rule => rule.run(req)));

    var validationErrors = validationResult(req)

    if(!validationErrors.isEmpty()){
        return res.render("new-product", {errorMessage: validationErrors.array()[0].msg,

        });
    }
    next();
};

export default validateRequest;