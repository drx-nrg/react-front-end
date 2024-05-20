import { useEffect, useState } from "react";
import fetchData from "../../hooks/useFetch";
import RecipeCard from "../../components/RecipeCard";

export default function DiscoverRecipes(){
    const [bestRecipes, setBestRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchData("best-recipe", setBestRecipes, "index", "recipes" ,null)
        fetchData("recipe", setRecipes, "index", "recipe", null)
    }, []);

    return (
        <main className="main pt-5">
            <section className="header text-center p-5 bg-light">
                <h1 className="pt-4 pb-2">Discover Recipes</h1>
            </section>
            <section className="py-3 mt-3">
                <div className="container text-center">
                    <h2 className="pt-4 mb-4">Top Best Recipes</h2>
                    <div className="row">
                        {bestRecipes?.length !== 0 && bestRecipes?.map(recipe => (
                            <RecipeCard data={recipe} key={recipe.id} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-3">
                <div className="container text-center">
                    <h2 className="pt-4 mb-4">All Other Recipes</h2>
                    <div className="row">
                        {recipes?.length !== 0 && recipes?.map(recipe => (
                            <RecipeCard data={recipe} key={recipe.id} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}