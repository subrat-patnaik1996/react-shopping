

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function CrudIndex()
{
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8080/products'
        })
        .then(response=>{
            setProducts(response.data);
        })
    },[]);

    function DeleteClick(e){
        var flag = window.confirm("Are you sure\nWant to Delete?");
        if(flag==true){
            axios({
                method: 'delete',
                url: `http://127.0.0.1:8080/deleteproduct/${parseInt(e.currentTarget.value)}`
            })
            alert('Record Deleted');
            navigate("/home");
        }
    }
    return(
        <div className="container-fluid">
            <h2>Products Grid</h2>
            <div className="mb-3">
                <Link to="/NewProduct" className="btn btn-primary">Add New Product</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product=>
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>
                                    <Link className="btn btn-info" to={'/cruddetails/' + product.id}>
                                     <span className="bi bi-eye"></span>
                                    </Link>
                                </td>
                                <td>
                                    <Link className="btn btn-warning" to={'/crudedit/' + product.id}>
                                     <span className="bi bi-pen"></span>
                                    </Link>
                                </td>
                                <td>
                                    <button value={product.id} className="btn btn-danger" onClick={DeleteClick}>
                                     <span className="bi bi-trash"></span>
                                    </button>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}