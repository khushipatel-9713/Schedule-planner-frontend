import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function Auth({children}){
    const {Login} = useSelector((store)=>store.LoginToken)
    if(Login){
        return children;
    }
    else{
        return <Navigate to="/login" />
    }
}

export default Auth;