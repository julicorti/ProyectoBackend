import ErrorEnum from "../service/errors/error.enum.js";

export const errorHandler = (error, req, res, next) =>{
    switch (error.code) {
        case ErrorEnum.CREATE_PRODUCT_ERROR:
            
            return res.status(400).send({error: error.name});
    
        default:
            return res.status(400).send({error: "unhanled error"});
    }
    next();
}