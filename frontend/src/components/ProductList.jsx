import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css";
import axios from "axios";
const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {
        const response = await axios.get("http://localhost:5000/product");
        setProducts(response.data);
    }

    const deleteProduct = async(id)=>{
        try {
            await axios.delete(`http://localhost:5000/product/${id}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container mt-5'>
            {/* <div> */}
            <a href={'/add'} className="btn btn-primary mb-4" style={{width:"10pc"}}>Add</a>
            {/* </div> */}
            <div className="row">
                {products.map((product) => (
                    <div className="col-3 me-3 mb-3">
                        <div className="card" key={product.id}>
                            <img className="card-img-top" src={product.url} alt="Picture Product" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <div className='d-flex align-items-start'>
                                    <a href={`/edit/${product.id}`} className="btn btn-success me-3">Edit</a>
                                    <a onClick={()=> deleteProduct(product.id)} href="#" className="btn btn-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList;