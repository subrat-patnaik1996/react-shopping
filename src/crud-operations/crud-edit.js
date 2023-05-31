import axios from "axios";
import { Field, Form, Formik,useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";


export function CrudEdit()
{
    const params=useParams();
    const navigate=useNavigate();

    const [products,setProduct]=useState([{id:0,title:'',price:0,stock:false }]);
   
    useEffect(()=>{
        axios({
           method:'get',
            url:`http://127.0.0.1:8080/details/${params.id}`
        }).then(response=>{
            console.log(response.data)
            setProduct(response.data);
        })
    },[])

    const formik=useFormik({
        initialValues :{
           
                id:products[0].id,
                title: products[0].title,
                price: products[0].price,
                stock: (products[0].stock==true?true:false)
            },
            onSubmit:  
                (values) =>{
                //alert(JSON.stringify(values));
                //   console.log(JSON.stringify(values));
                axios({
                    method:'put',
                    url:'http://127.0.0.1:8080/updateproduct',
                    data:values
                 }).then(()=>{
                    alert("Product Updated Successfully");
                    navigate("/products");
                 })  
                },
              enableReinitialize:true
    })
    return(
      <div className="container-fluid">
            <h2>Edit Product</h2>
           
                   <form onSubmit={formik.handleSubmit}>
                        <dl>
                           
                            <dt>title</dt>
                            <dd><input   name="title" type="text" value={formik.values.title} onChange={formik.handleChange}  /> </dd>
                           
                            <dt>price</dt>
                            <dd><input name="price" type="text" value={formik.values.price}  onChange={formik.handleChange}/></dd>
                           
                            <dt>stock  </dt>
                            <dd className="form-switch">
                                <input type="checkbox" className="form-check-input" name="stock"
                                checked={formik.values.stock==true?"checked" :""}
                                onChange={formik.handleChange} value={(formik.values.stock==true)?true:false}  />
                            </dd>
                        </dl>
                     
                        <button className="btn btn-success" type="submit">Save</button>
                        <div>
                            <Link to="/products">Back to Products</Link>
                        </div> 
                    </form> 
        </div>
           
    )
}





































// export function CrudEdit(){
//     const params = useParams();
//     const [products, setProducts] = useState([{id:0, title:'', price:0, stock:false}]);
//     const navigate = useNavigate();

//     useEffect(()=>{
//         axios({
//             method:'get',
//             url: `http://127.0.0.1:8080/details/${params.id}`
//         })
//         .then(response=> {
//             setProducts(response.data);
//         })
//     },[]);
//     return( 
//         <div className="container-fluid">
//             <h2>Edit Product</h2>
//             <Formik initialValues={
//                 {
//                     id:0,
//                     title: '',
//                     price: 0,
//                     stock: false
//                 }
//             }
//               onSubmit= {
//                 (values) =>{
//                     axios({
//                         method:'put',
//                         url: 'http://127.0.0.1:8080/updateproduct',
//                         data : values
//                     }).then(()=>{
//                         alert("Product Updated");
//                         navigate("/products");
//                     }                        
//                     )
                  
//                 }
//               }
              
//             >
//                 {
//                     <Form>
//                         <dl>
//                             <dt>title</dt>
//                             <dd>
//                                 <Field type="text" name="title"  value={products[0].title} ></Field>
//                             </dd>
//                             <dt>price</dt>
//                             <dd>
//                                 <Field type="text" name="price" value={products[0].price}></Field> 
//                             </dd>
//                             <dt>stock</dt>
//                             <dd>
//                                 <Field type="checkbox" name="stock" checked={products[0].stock}></Field>
//                             </dd>
//                         </dl>
//                         <button  className="btn btn-success">Save</button>
//                         <div>
//                             <Link to="/products">Back to Products</Link>
//                         </div>
//                     </Form>
//                 }
//             </Formik>
//         </div>
//     )
// }