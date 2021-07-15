import axios from "axios";
import { useState } from "react";

const useRequestHook = ({url,method,body, onSuccess}) => {
    const [errors,setErrors] = useState(null);

    const doRequest = async () => {
        try{
            setErrors(null);
            const response = await axios[method](url,body);

            if(onSuccess){
                onSuccess(response.data);
            }

            return response.data;
        }catch(err){
            setErrors(
            <div className="alert alert-danger">
            <h4>Ooopss....</h4>
            <ul className="my-0">
            {err.response.data.errors.map( err => <li key={err.message}>{err.message}</li>)}
            </ul>
            </div>
            );
        }
    };

    return {doRequest,errors};
};

export default useRequestHook;