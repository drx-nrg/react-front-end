import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Api from "../../config/Api";
import Swal from "sweetalert2";

export default function Register(){
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        password_confirmation: "",
    });
    const navigate = useNavigate()

    function handleChange(e){
        return setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        for(const key in credentials){
            formData.append(key, credentials[key]);
        }

        await Api
            .post('v1/auth/register', formData)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Successfully create new account!",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                }).then(result => {
                    if(result.isConfirmed){
                        navigate('/discover-recipes');
                    }
                })
            })
            .catch(err => {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to create new account! ${err.message}`,
                    icon: "error",
                    showCancelButton: true,
                    showConfirmButton: false,
                });
            })
    }

    return (
        <main className="main pt-5">
            <section className="header text-center p-5 bg-light">
                <h1 className="pt-4 pb-2">Register</h1>
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
                                        <div className="mb-2">
                                            <label htmlFor="password_confirmation">Password Confirmation</label>
                                            <input type="password" name="password_confirmation" id="password_confirmation" className="form-control" placeholder="Enter Password Confirmation" onChange={handleChange} />
                                        </div>
                                        <div className="mt-3">
                                            <button type="submit" className="btn btn-primary w-100">Register</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-4">
                                    Already have an account? <Link to="/auth/login" className="text-primary">Sign in</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}