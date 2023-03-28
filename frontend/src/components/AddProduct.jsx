import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const LoadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }
    const InsertProduct = async(e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file",file);
        formData.append("title",title);
        try {
            await axios.post("http://127.0.0.1:5000/product", formData, {
                headers:{
                    "Content-Type" : "multipart/from-data"
                }
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-5">
            <form onSubmit={InsertProduct}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name Product</label>
                    <input type="text" class="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <label for="formFile" class="form-label">Product Image</label>
                    { preview
                        ? <div class="mb-3"><img src={preview} class="img-thumbnail" alt="previewimage"></img></div>
                        : ""
                    }
                <div class="mb-3">
                    <input class="form-control" type="file" id="formFile" onChange={LoadImage} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddProduct;