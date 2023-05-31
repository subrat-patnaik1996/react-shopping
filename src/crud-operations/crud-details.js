import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export function CrudDetails()
{
    const params = useParams();
    const [products, setProducts] = useState([{id:0, title:'', price:0, stock:false}]);

    useEffect(()=>{
        axios({
            method:'get',
            url: `http://127.0.0.1:8080/details/${params.id}`
        })
        .then(response=> {
            setProducts(response.data);
        })
    },[]);

    return(
        <div className="container-fluid">
            <h2>Product Details</h2>
            <dl>
                <dt>Name</dt>
                <dd>{products[0].title}</dd>
                <dt>Price</dt>
                <dd>{products[0].price}</dd>
                <dt>Stock</dt>
                <dd>{(products[0].stock==true)?"Available":"Out of Stock"}</dd>
            </dl>
            <Link to="/products">Back to Products</Link>
        </div>
    )
}