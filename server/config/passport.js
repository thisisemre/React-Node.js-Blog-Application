import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "./database.js";


passport.use(
    new Strategy(async function verify(username, password, cb) {
        
        try {
            const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const storedHashedPassword = user.password;
                const isMatch = await bcrypt.compare(password, storedHashedPassword);
                if (isMatch) {
                    return cb(null, user);
                } else {
                    return cb(null, false, { message: "Incorrect password" });
                }
            } else {
                return cb(null, false, { message: "User not found" });
            }
        } catch (err) {
            return cb(err);
        }
    })
);

passport.serializeUser((user,cb)=>{
    cb(null,user);
})
passport.deserializeUser((user,cb)=>{
    cb(null,user);
})

export default passport;