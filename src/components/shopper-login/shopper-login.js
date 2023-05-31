import {  useFormik , Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";

export function ShopperLogin(){
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    return(
        <div>
            <h2>User Login</h2>
            <Formik 
              initialValues={{
                 "UserId":"",
                 "Password":""
              }}
              onSubmit={
                (values)=>{
                    axios({
                        method: "get",
                        url: "http://127.0.0.1:8080/users"
                    })
                    .then(response=>{
                        for(var user of response.data){
                            if(user.UserId==values.UserId && user.Password==values.Password) {
                                setCookie("userid", values.UserId);
                                navigate("/home");
                                break;
                            } else {
                                navigate("/invalid");
                            }
                        }
                    })
                }
              }
            >
            {
                <Form>
                    <dl>
                        <dt>User Id</dt>
                        <dd><Field type="text" name="UserId" /></dd>
                        <dt>Password</dt>
                        <dd><Field type="password" name="Password" /></dd>
                    </dl>
                    <button className="btn btn-success">Login</button>
                    <div>
                        <Link to="/register">New User? Register</Link>
                    </div>
                </Form>
            }
            </Formik>
        </div>
    )
}