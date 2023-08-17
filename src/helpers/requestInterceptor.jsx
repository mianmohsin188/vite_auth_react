import axios from "axios";
import Swal from "sweetalert2";

axios.interceptors.request.use(
(config)=>{
    var loader = document.getElementById('loader');
    loader.classList.remove("d-none");

    config.headers.Authorization = localStorage.getItem('token');
        return config;
    }
)
axios.interceptors.response.use(

    (response)=>{
        var loader = document.getElementById('loader');
        loader.classList.add("d-none");
        if(response.data.status=== 401){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            Swal.fire("Error","Your session has expired","error");
            setTimeout(()=>{window.location.reload()},800);

        }
        return response
    },
    (error)=>{
        console.log(error.response.status);
        var loader = document.getElementById('loader');
        loader.classList.add("d-none");
        if(error.response.status===401){
            if (localStorage.getItem('token')!==null) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                Swal.fire("Error","Your session has expired","error");
                setTimeout(()=>{window.location.reload()},800);
            }
            else
            {
                Swal.fire("Error","Your session has expired","error");
                setTimeout(()=>{window.location.reload()},800);
            }
        }
        return Promise.reject(error);
    }
)
export default axios;