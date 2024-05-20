import { useEffect, useState } from "react"
import fetchData from "../../hooks/useFetch";
import Api from "../../config/Api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate, Link } from 'react-router-dom';

export default function CreateRecipe(){
    const [recipe, setRecipe]= useState({
        title: "",
        slug: "",
        category_id: "",
        ingredients: "",
        method: "",
        tips: "",
        energy: "",
        carbohydrate: "",
        protein: "",
        thumbnail: "",
        user_id: "",
    });
    const [errors, setErrors]= useState(null)
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchData("category", setCategories, "index", "category", null)
    }, []);

    function handleChange(e){
        return setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        for(const key in recipe){
            formData.append(key, recipe[key]);
        }

        await Api
            .post(`v1/recipe`, formData, {
                headers:{
                    "Authorization": `Bearer ${Cookies.get("token")}`,
                    "Content-type": 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.status === 200){
                    Swal.fire({
                        title: "Success!",
                        text: "Successfully create new recipe!",
                        icon: "success",
                        showCancelButton: false,
                        showConfirmButton: true,
                    }).then(result => {
                        if(result.isConfirmed){
                            navigate('/profile');
                        }
                    })
                }
            })
            .catch(err => {
                if(err.response.status === 422){
                    setErrors(err.response.data.errors);
                    Swal.fire({
                        title: "Error!",
                        text: `Failed to create new recipe!`,
                        icon: "error",
                        showCancelButton: false,
                        showConfirmButton: true,
                    })
                }
                else{
                    Swal.fire({
                        title: "Error!",
                        text: `Error while create recipe ${err.message}`,
                        icon: "error",
                        showCancelButton: true,
                        showConfirmButton: false,
                    });
                }
            })
    }

    console.log(errors)

    const errorsInfo = [];

    if(errors){
        for(const key in errors){
            errorsInfo.push(<li>{errors[key]}</li>)
        }
    }

    return (
        <main className="main pt-5">
            <section className="header text-center p-5 bg-light">
                <h1 className="pt-4 pb-2">Post a Recipe</h1>
            </section>
            <section className="py-3 mt-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <ul className="text-danger">
                                {errorsInfo.length !== 0 && (<ul>{errorsInfo}</ul>)}
                            </ul>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <label htmlFor="title">Title</label>
                                            <input type="text" name="title" id="title" className="form-control" placeholder="Enter Title" autoFocus onChange={handleChange} />
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="slug">Slug</label>
                                            <input type="text" name="slug" id="slug" className="form-control" placeholder="Enter Slug" onChange={handleChange}/>
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="category_id">Category</label>
                                            <select name="category_id" id="category_id" className="form-select" onChange={handleChange}>
                                                {categories?.map((category, index) => (
                                                    <option value={category.id} key={index}>{category.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="ingredients">Ingredients</label>
                                            <textarea name="ingredients" id="ingredients" cols="30" rows="4" className="form-control" placeholder="Enter Ingredients" onChange={handleChange}></textarea>
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="method">Method</label>
                                            <textarea name="method" id="method" cols="30" rows="4" className="form-control" placeholder="Enter Method" onChange={handleChange}></textarea>
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="tips">Tips</label>
                                            <textarea name="tips" id="tips" cols="30" rows="4" className="form-control" placeholder="Enter Tips" onChange={handleChange}></textarea>
                                        </div>

                                        <div className="mb-2">
                                            <div className="row">
                                                <div className="col-4">
                                                    <label htmlFor="energy">Energy</label>
                                                    <div className="input-group">
                                                        <input type="number" name="energy" id="energy" className="form-control" onChange={handleChange}/>
                                                        <span className="input-group-text">kcal</span>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <label htmlFor="energy">Carbohydrate</label>
                                                    <div className="input-group">
                                                        <input type="number" name="carbohydrate" id="carbohydrate" className="form-control" onChange={handleChange}/>
                                                        <span className="input-group-text">g</span>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <label htmlFor="protein">Protein</label>
                                                    <div className="input-group">
                                                        <input type="number" name="protein" id="protein" className="form-control" onChange={handleChange}/>
                                                        <span className="input-group-text">g</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="thumbnail">Thumbnail</label>
                                            <input type="file" name="thumbnail" id="thumbnail" className="form-control" onChange={(e) => setRecipe({...recipe, thumbnail: e.target.files[0]})}/>
                                        </div>

                                        <div className="mt-4">
                                            <div className="row">
                                                <div className="col-6">
                                                    <Link to="/profile" className="btn btn-outline-primary w-100">Cancel</Link>
                                                </div>
                                                <div className="col-6">
                                                    <button type="submit" className="btn btn-primary w-100">Post Recipe</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}