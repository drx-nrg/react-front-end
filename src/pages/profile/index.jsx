import { useContext, useEffect, useState } from "react";
import fetchData from "../../hooks/useFetch";
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from "../../components/RecipeCard";
import AuthContext from "../../AuthContext";

export default function Profile(){
    const isLoggedIn = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggedIn){
            navigate('/auth/login');
        }
    }, [isLoggedIn]);

    const [profile, setProfile] = useState({});

    useEffect(() => {
        fetchData("profile", setProfile, "index", "profile", null)
    }, []);
    
    return (
        <main className="main pt-5">
            <section className="header text-center p-5 bg-light">
                <h1 className="pt-4 pb-2">Profile</h1>
            </section>

            <section className="py-3 mt-3">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between pt-4 mb-4">
                        <h2 className="mb-0">My Recipes</h2>
                        <Link to={'/post-recipe'} className="btn btn-primary">Post a Recipe</Link>
                    </div>

                    <div className="row text-center">
                        {profile?.recipes?.map((recipe, index) => (
                            <RecipeCard data={recipe} key={index} />
                        ))}
                    </div>
                </div>
            </section>

        </main>
    )
}