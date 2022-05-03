import axios from "axios";
import {toast} from 'react-toastify'
import {loginFailure,loginStart,loginSuccess} from './AuthAction'

export const loginCall=async (user,dispatch)=>{
    dispatch(loginStart());
    try{
            const res= await axios.post("http://localhost:3000/server/auth/",user);
            dispatch(loginSuccess(res.data))
            toast.success("Login Successfully")
    }catch(err){
        dispatch(loginFailure())
        toast.error("Please enter correct credentials ")
    }
}