import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function ShopperHome()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    useEffect(()=>{
        if(cookies["userid"]==undefined){
            navigate("/login");
        }
    },[]);
    function SignoutClick(){
        removeCookie("userid");
        navigate("/login");
    }
    return (
        <div className="container-fluid d-flex justify-content-between">
            
            <div>
            <div className="d-flex justify-content-between">
                <div>
                    <img src="electronics.jpg" style={{width:'200px', height:'300px'}}/>
                </div>
                <div>
                    <img src="mens.jpg"  style={{width:'200px', height:'300px'}}  />
                </div>
                <div>
                    <img src="women.jpg"  style={{width:'200px', height:'300px'}}  />
                </div>
                <div>
                    <img src="jewelery.jpg"  style={{width:'200px', height:'300px'}}  />
                </div>
            </div>
            </div>
            <div>
                <h4>Hello !  - {cookies["userid"]}</h4>
                <button onClick={SignoutClick} className="btn btn-link">Signout</button>
            </div>
        </div>
    )
}