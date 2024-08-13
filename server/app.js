import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import {dirname} from "path";
import {fileURLToPath} from "url";
import env from "dotenv";
import path from 'path';
import cors from 'cors';

import passportConfig from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blogs.js";

env.config();

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const PORT = 5000;




app.use(cors({
  origin: 'http://localhost:3000', // React uygulamanızın adresi
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials:true
}));


app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build'))); 

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false, // ?
    saveUninitialized:true,
}));

app.use(passportConfig.initialize());
app.use(passportConfig.session());


app.use("/auth",authRoutes);
app.use("/blogs",blogRoutes);




app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });




export {__dirname};