import Product from "../models/productmodels.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductByid = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveproduct = (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No File Uploaded" });
    } else {
        const name = req.body.title;
        const file = req.files.file;
        const filesize = file.data.length;
        const ext = path.extname(file.name);
        // return res.json({tes:file.name});
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowedtype = [".jpg", ".png", ".jpeg"];

        if (!allowedtype.includes(ext.toLocaleLowerCase())) {
            return res.status(422).json({ msg: "Invalid Format Image" });
        }
        if (filesize > 5000000) {
            return res.status(422).json({ msg: "Image size max 5mb" })
        }
        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) { return res.status(500).json({ msg: err.message }) };
            try {
                await Product.create({
                    name: name,
                    image: fileName,
                    url: url
                });
                res.status(201).json({ msg: "Product Created success" });
            } catch (error) {
                console.log(error.message);
            }
        })
    }
}

export const updateproduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) { return res.status(404).json({ msg: "Data Not Found" }) };
    let fileName = "";
    if (req.files === null) {
        fileName = product.image;
    } else {
        const file = req.files.file;
        const filesize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedtype = [".jpg", ".jpeg", ".png"];
        if (!allowedtype.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Format Image Invalid" });
        }
        if (filesize > 5000000) {
            return res.status(422).json({ msg: "File Size Max 5MB" });
        }

        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            // console.log(err);
            if (err) {
                return res.status(500).json({ msg: err.message });
            }
        })
    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Product.update({
            name: name,
            image: fileName,
            url: url
        }, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Product Update successfuly" })
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteproduct = async (req, res) => {
    console.log("tes");
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) { return res.status(404).json({ msg: "Data Not Found" }) };
    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product Deleted Success" });
    } catch (error) {
        console.log(error.message);
    }
}