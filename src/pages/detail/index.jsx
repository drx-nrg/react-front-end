import { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom'
import fetchData from '../../hooks/useFetch';
import FillStar from './../../img/star.png'
import EmptyStar from  './../../img/star-o.png'
import Cookies from 'js-cookie';
import Api from '../../config/Api';
import Swal from 'sweetalert2';

export default function DetailRecipe(){
    const [recipe, setRecipe] = useState({});
    const [starStatus, setStarStatus] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    });
    const [ratings, setRatings]= useState(0);
    const [comment, setComment] = useState("")
    const params = useParams();

    useEffect(() => {
        fetchData("recipe", setRecipe, "show", null, params.slug)
    }, [params]);

    useEffect(() => {
        const stars = document.querySelectorAll('#star');
        for(const key in starStatus){
            if(starStatus[key] && stars[key - 1].src !== EmptyStar){
                for(let i = 0; i <= key - 1; i++){
                    stars[i].src = FillStar
                }
            }
            
            if(starStatus[key] && stars[key - 1].src !== FillStar){
                for(let j = 5; j > key - 1; j--){
                    stars[j].src = EmptyStar
                }
            }
            setRatings(key);
        }
    }, [starStatus]);

    function handleStars(e){
        return setStarStatus(() => {
            let rating = {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
            }

            rating[e.target.dataset.number] = true

            return rating;
        });


    }

    async function submitComment(){
        const formData = new FormData();

        formData.append('comment', comment);

        await Api
            .post(`v1/comment/${params.slug}`, formData, {
                headers:{
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Successfully create comment and rating!",
                    icon: "success",
                    showCancelButtton: false,
                    showConfirmButton: true,
                }).then(result => {
                    if(result.isConfirmed){
                        window.location.reload()
                    }
                })
            })
            .catch(err => {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to create comment! ${err.message}`,
                    icon: "error",
                    showCancelButton: true,
                    showConfirmButton: false,
                });
            });
    }

    async function submitRating(e){
        e.preventDefault();

        let formData = new FormData();

        formData.append('rating', ratings);

        await Api
            .post(`v1/rating/${params.slug}`, formData, {
                headers:{
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            .then(() => {
                submitComment()
            })
            .catch(err => {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to create rating! ${err.response.data.message}`,
                    icon: "error",
                    showCancelButton: true,
                    showConfirmButton: false,
                });
            });
    }

    return (
        <main className="main pt-5">
            <section className="header text-center p-5 bg-light">
                <h1 className="pt-4 pb-2">{recipe?.title}</h1>
                <div className="d-flex align-items-center justify-content-center">
                    <span>
                        {recipe?.ratings_avg && [...Array(Math.floor(recipe?.ratings_avg))].map((_,i) => (
                                <img src={FillStar} alt="Star" key={i} />
                            ))}
                        {recipe?.ratings_avg && [...Array(5 - Math.floor(recipe?.ratings_avg))].map((_, i) => (
                            <img src={EmptyStar} alt="Star" key={i} />
                        ))}
                    </span>
                    <span className="ms-3 mt-1 text-muted">{`(${recipe?.ratings_avg})`}</span>
                </div>
            </section>

            <section className="py-3 mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <img src={`http://localhost:8000/storage/${recipe?.thumbnail}`} alt="Recipe 1" className="w-100 rounded recipe-image" height="600"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7">

                            <div className="card mb-4">
                                <div className="card-body">

                                    <h5 className="mb-2">Recipe Meta</h5>

                                    <table className="mb-2">
                                        <tbody>
                                        <tr>
                                            <td>Category</td>
                                            <td className="px-3">:</td>
                                            <td className="text-muted">{recipe?.category?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Author</td>
                                            <td className="px-3">:</td>
                                            <td className="text-muted">{recipe?.author}</td>
                                        </tr>
                                        <tr>
                                            <td>Created Date</td>
                                            <td className="px-3">:</td>
                                            <td className="text-muted">{recipe?.created_at}</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <h5 className="mb-2">Ingredients</h5>
                                        <div className="text-muted" dangerouslySetInnerHTML={{__html: recipe?.ingredients}}>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="mb-2">Method</h5>
                                        <div className="text-muted" dangerouslySetInnerHTML={{__html: recipe?.method}} >
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="mb-2">Tips</h5>
                                        <div className="text-muted">
                                            {recipe?.tips}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="mb-2">Nutrition Facts</h5>
                                        <div className="text-muted">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <span><b>{recipe?.energy} kcal</b> (Energy)</span>
                                                    </td>
                                                    <td className="px-4">
                                                        <span><b>{recipe?.carbohydrate}g</b> (Carbohydrate)</span>
                                                    </td>
                                                    <td>
                                                        <span><b>{recipe?.protein}g</b> (Protein)</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="mb-2">Rating</h5>
                                    <p className="text-muted mb-1">Click on the star(s) to rate</p>
                                    {Cookies.get("token") ? 
                                    (<div className="btn-group">
                                        <button className="btn p-0">
                                            <img src={EmptyStar} alt="Star" id='star' data-number='1' onClick={handleStars} />
                                        </button>
                                        <button className="btn p-0 ms-1">
                                            <img src={EmptyStar} alt="Star" id='star' data-number='2' onClick={handleStars} />
                                        </button>
                                        <button className="btn p-0 ms-1">
                                            <img src={EmptyStar} alt="Star" id='star' data-number='3' onClick={handleStars} />
                                        </button>
                                        <button className="btn p-0 ms-1">
                                            <img src={EmptyStar} alt="Star" id='star' data-number='4' onClick={handleStars} />
                                        </button>
                                        <button className="btn p-0 ms-1">
                                            <img src={EmptyStar} alt="Star" id='star' data-number='5' onClick={handleStars} />
                                        </button>
                                    </div>
                            ) : (
                                        <Link to={'/auth/login'} href="login.html" className="text-primary">Login to rate</Link>
                                    )}
                                </div>
                            </div>
                            <div className="card mb-2">
                                <div className="card-body pb-0">
                                    {Cookies.get("token") && (
                                        <form onSubmit={submitRating}>
                                            <textarea name="comment" id="comment" cols="30" rows="6" className="form-control mb-3" placeholder="Type comment.." onChange={(e) => setComment(e.target.value)} ></textarea>
                                            <button className="btn btn-primary" type="submit">Post Comment</button>
                                            <hr className="my-4"/>
                                        </form>
                                    )}
                                    <h5 className="mb-2">Comments</h5>
                                    <div className="list-comments">
                                        {recipe?.comment?.length === 0 && (<p>No Comment</p>)}
                                        {recipe?.comment?.length !== 0 && recipe?.comment?.map((comment, index) => {
                                            let commentDate = new Date(comment.created_at);

                                            return (
                                                <div className="border rounded py-3 px-4 my-3 d-flex justify-content-between" key={index}>
                                                    <div>
                                                        <h6 className="mb-2">{comment.user.username}</h6>
                                                        <p className="text-muted mb-0">{comment.comment}</p>
                                                    </div>
                                                    <small className="text-muted">{`${commentDate.getDate() < 10 ? "0" + commentDate.getDate() : commentDate.getDate()}-${commentDate.getMonth() < 10 ? "0" + commentDate.getMonth() : commentDate.getDate()}-${commentDate.getFullYear()}`}</small>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}