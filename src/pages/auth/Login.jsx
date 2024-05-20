import { useState } from "react"
import Api from "../../config/Api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'

export default function Login(){
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    function handleChange(e){
        return setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        for(const key in credentials){
            formData.append(key, credentials[key]);
        }

        await Api
            .post('v1/auth/login', formData)
            .then(res => {
                Cookies.set("token", res.data.accessToken, {expires: null});
                Swal.fire({
                    title: "Success!",
                    text: "Successfully logged in!",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                }).then(res => {
                    if(res.isConfirmed){
                        navigate('/discover-recipes');
                        window.location.reload()
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    title: "Error!",
                    text: `Error while login ${err.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: true,
                })
            })
    }


    return (
        <main className="main pt-5">
            <section className="header text-center p-5 bg-light">
                <h1 className="pt-4 pb-2">Login</h1>
            </section>
            <section className="py-3 mt-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <form onSubmit={handleSubmit}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" name="username" id="username" className="form-control" placeholder="Enter Username" onChange={handleChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" onChange={handleChange} />
                                        </div>
                                        <div className="mt-3">
                                            <button type="submit" className="btn btn-primary w-100">Login</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-4">
                                    Don&apos;t have an account yet? <a href="register.html" className="text-primary">Register now</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}