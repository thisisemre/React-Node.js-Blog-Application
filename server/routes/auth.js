import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../config/database.js";
import passportConfig from "../config/passport.js";
import {__dirname} from "../app.js";

const router = Router();
const saltRound = 10;


router.post("/login", (req, res, next) => {
    passportConfig.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
            delete user.password;
            return res.status(200).json({ message: "Login successful", user });
        });
    })(req, res, next);
});

router.post("/register",async(req,res)=>{


    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    bcrypt.hash(password,saltRound,async(err,hash)=>{
        if(err){
            console.log("Error hashing password", err);
            res.status(500).json({ message: "Error hashing password" });
        }else{
            let result = await db.query(
                "INSERT INTO users (username,password,email) VALUES($1,$2,$3) RETURNING * ",[username,hash,email]
            );
            res.status(201).json({ message: "You registered" });
            var user = result.rows[0];
            delete user.password;
            req.logIn(user,(err)=>{
                if(err){
                    res.status(500).json({message:"Error logging"});
                }res.status(201).json({message:"You logged in"});
            });
        }
    })
        


})
export default router;