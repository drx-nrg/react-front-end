import Cookies from "js-cookie";
import Api from "../config/Api";

export default async function fetchData(name, callback, method, key ,id){
    try{
        const response = await Api.get(method === "index" ? `v1/${name}` : `v1/${name}/${id}`,{
            headers:{
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        });

        callback(prevState => {
            if(!key){
                return response.data;
            }

            return response.data[key]
        })
    }catch(err){
        console.log("Error while fetching ", name, " data: ", err.message);
    }
}