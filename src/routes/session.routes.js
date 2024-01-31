import { Router } from "express";
import { userModel } from "../../dao/models/user.model.js";
const sessionRouter = Router();
sessionRouter.post('/register', async(req, res) =>{
    const {first_name, last_name, email, age, password} = req.body;
  
    try {
       const user = await userModel.create({
            rol: "User",first_name, last_name, email, age, password
        });
        req.session.user = user;
        res.redirect('/products')
   
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
        
    }
})

sessionRouter.post('/login', async(req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        if(user.password !== password){
            return res.status(404).send({messages: 'Invalid credentials'})
        }
        req.session.user = user;
        res.redirect('/products')
    } catch (error) {
        res.status(400).send({error})
    }
})
sessionRouter.post('/logout', async(req, res) =>{
   try {
    req.session.destroy((err)=> {
        if(err){

            return res.status(500).json({message: 'Logous failed'})
        }
    });
    res.send({redirect: 'http://localhost:8080/login'})
   } catch (error) {
    res.status(400).send({error});
   }
})
export default sessionRouter;