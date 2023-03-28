import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export const EditProduct = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductByid();
    },[])

    const getProductByid = async() =>{
        const res = await axios.get(`http://localhost:5000/product/${id}`);
        setTitle(res.data.name);
        setFile(res.data.image);
        setPreview(res.data.url);
    }

    const LoadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }
    const UpdateProduct = async(e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file",file);
        formData.append("title",title);
        try {
            await axios.patch(`http://127.0.0.1:5000/product/${id}`, formData, {
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
            <form onSubmit={UpdateProduct}>
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

export default EditProduct;