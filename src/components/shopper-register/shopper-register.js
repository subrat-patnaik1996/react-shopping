import {  useFormik , Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function ShopperRegister()
{
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userError, setUserError] = useState('');

    useEffect(()=>{
            axios({
                method:'get',
                url: 'http://127.0.0.1:8080/users'
            })
            .then(response=> {
                setUsers(response.data);
            })
    },[]);

    function VerifyUserId(e){
        for(var user of users){
            if(user.UserId==e.target.value){
                setUserError('User Name Taken - Try Another');
                break;
            } else {
                setUserError('User Name Available');
            }
        }
    }
    return(
        <div className="container-fluid">
            <h3>Regiser User</h3>
            <Formik 
             initialValues={{
                UserId:"",
                UserName:"",
                Password:"",
                Email:"",
                Age:0,
                Mobile:""
             }}

             validationSchema={
                yup.object({
                    UserId: yup.string().required("User Id Required"),
                    UserName: yup.string().required("User Name Required"),
                    Password: yup.string().required("Password Required").matches(/(?=.*[A-Z])\w{4,15}/, "Password 4 to 15 chars with atleast one uppercase letter"),
                    Email: yup.string().required("Email Required").email("Invalid Email"),
                    Age: yup.number().required("Age Required"),
                    Mobile: yup.string().required("Mobile Required").matches(/\+91\d{10}/,"Invalid Mobile +91 and 10 digits")
                })
             }

             onSubmit= {
                (values)=> {
                    axios({
                        method: "post",
                        url: "http://127.0.0.1:8080/registeruser",
                        data: values
                    })
                    .then(()=>{
                        alert("Register Successfully..");
                        navigate("/login");
                    })
                }
             }
            >
              {
                <Form>
                    <dl>
                        <dt>User Id</dt>
                        <dd> <Field type="text" onKeyUp={VerifyUserId} name="UserId" /> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="UserId" />
                        </dd>
                        <dd>{userError}</dd>
                        <dt>User Name</dt>
                        <dd> <Field type="text" name="UserName" /> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="UserName" />
                        </dd>
                        <dt>Password</dt>
                        <dd> <Field type="password" name="Password" /> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="Password" />
                        </dd>
                        <dt>Email</dt>
                        <dd> <Field type="text" name="Email" /> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="Email" />
                        </dd>
                        <dt>Age</dt>
                        <dd> <Field type="number" name="Age" /> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="Age" />
                        </dd>
                        <dt>Mobile</dt>
                        <dd> <Field type="text" name="Mobile" /> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="Mobile" />
                        </dd>
                    </dl>
                    <button className="btn btn-primary">Register</button>
                    <div>
                        <Link to="/login">Existing User?</Link>
                    </div>
                </Form>
              }
            </Formik>
        </div>
    )
}