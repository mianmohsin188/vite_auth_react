import axios from "axios";
import Swal from "sweetalert2";

axios.interceptors.request.use(
    (config)=>{
        config.headers.Authorization = localStorage.getItem('token');
        return config;
    }
)
axios.interceptors.response.use(

    (response)=>{

        if(response.data.status=== 401){


            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
            Swal.fire("Error",response.data.message,"error");


        }
        return response
    },
    (error)=>{
        console.log(error.response.status);
        if(error.response.status===401){
            if (localStorage.getItem('token')!==null) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
                Swal.fire("Error","response.data.message","error");
            }
            else
            {
                Swal.fire("Error","response.data.message","error");
            }




        }
        return Promise.reject(error);
    }
)
export default axios;