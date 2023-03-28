import express  from "express";
import fileUpload from "express-fileupload";
import cors  from "cors";
import productroute from "./routes/productroute.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(productroute);
app.use(express.static("public"));
app.listen(5000,()=> console.log("Server Running"))