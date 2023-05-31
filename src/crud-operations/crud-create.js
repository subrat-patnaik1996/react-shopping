import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function CrudCreate(){

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [idError, setIdError] = useState('');

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8080/products'
        })
        .then(response=>{
            setProducts(response.data);
        })
    },[]);

    function VerifyId(e){
        var id = parseInt(e.target.value);
        for(var product of products) {
            if(product.id==id) {
                setIdError('Product ID Taken - Try another');
                break;
            } else {
                setIdError('Product ID Available');
            }
        }
    }
    return(
        <div className="container-fluid">
            <h2>Add New Product</h2>
            <Formik 
              initialValues={{
                id: 0,
                title: '',
                price: 0,
                stock: false
              }}
              onSubmit={
                (values)=>{
                    axios({
                        method:'post',
                        url: 'http://127.0.0.1:8080/addproducts',
                        data : values
                    }).then(()=>{
                        alert("Product Registered");
                        navigate("/products");
                    }                        
                    )
                }
              }
            >
                {
                    <Form>
                        <dl>
                            <dt>id</dt>
                            <dd><Field name="id" onKeyUp={VerifyId} type="number" /></dd>
                            <dd>{idError}</dd>
                            <dt>title</dt>
                            <dd><Field name="title" type="text" /></dd>
                            <dt>price</dt>
                            <dd><Field name="price" type="number" /></dd>
                            <dt>stock</dt>
                            <dd className="form-switch"><Field className="form-check-input" name="stock" type="checkbox" /> Available</dd>
                        </dl>
                        <button className="btn btn-primary">Add Product</button>
                        <Link className="ms-2" to="/products">View Products</Link>
                    </Form>
                }
            </Formik>
        </div>
    )
}