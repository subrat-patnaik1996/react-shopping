import axios from "axios";
import { useEffect, useState } from "react";

export function ShopperJewelery()
{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://fakestoreapi.com/products/category/jewelery',
        })
        .then(response=> {
            setProducts(response.data);
        })
    },[]);

    return(
        <div className="container-fluid">
            <div className="d-flex flex-wrap">
                {
                    products.map(product=> 
                        <div className="card m-2 p-2" style={{width:'200px'}}>
                            <img src={product.image} height="150" className="card-img-top"/>
                            <div className="card-header" style={{height:'150px'}}>
                                <p>{product.title}</p>
                            </div>
                        </div>
                        )
                }
            </div>
        </div>
    )
}