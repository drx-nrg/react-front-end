import Cookies from "js-cookie"
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Api from "../../config/Api";
import { useEffect } from "react";

export default function Logout(){
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: "Warning!",
            text: "Are you sure wat to log out ?",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
        }).then(result => {
            if(result.isConfirmed){
                logout();
            }

            if(result.dismiss){
                navigate('/discover-recipes');
            }
        })
    }, [])

    async function logout(){
        try{
            const response = await Api.get('v1/auth/logout', {
                headers:{
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            });

            if(response.status === 200){
                Cookies.remove("token");
                Swal.fire({
                    title: "Success!",
                    text: "Successfully logged out from website!",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                }).then(result => {
                    if(result.isConfirmed){
                        navigate('/auth/login')
                    }
                });
            }
        }catch(err){
            Swal.fire({
                title: "Failed!",
                text: `Failed to logged out from website! ${err.message}`,
                icon: "error",
                showCancelButton: false,
                showConfirmButton: true,
            });
        }
    }

    return (
        <></>
    )
}