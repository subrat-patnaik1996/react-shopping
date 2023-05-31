import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function ShopperDetails(){
    const [product, setProduct] = useState({id:0, title:'', price:0, rating:{rate:0, count:0}});
    const params = useParams();

    useEffect(()=>{
        axios({
            method:'get',
            url: `http://fakestoreapi.com/products/${params.id}`
        }).then(response=>{
            setProduct(response.data);
        })
    },[]);

    return(
        <div className="container-fluid">
            <h2>Details</h2>
            <div className="row">
                <div className="col-3">
                    <img src={product.image} width="200" height="200"/>
                </div>
                <div className="col-9">
                    <dl>
                        <dt>Title</dt>
                        <dd>{product.title}</dd>
                        <dt>Price</dt>
                        <dd>{product.price}</dd>
                        <dt>Rating</dt>
                        <dd><span className="bi bi-star-fill text-success"></span> {product.rating.rate} [{product.rating.count}] </dd> 
                    </dl>
                    <div>
                        <Link to={'/category/' + product.category}>Back to {product.category}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}