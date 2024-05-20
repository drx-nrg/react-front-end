import {Link} from 'react-router-dom'
import FillStar from './../img/star.png'
import EmptyStar from  './../img/star-o.png'

export default function RecipeCard({data}){
    return (
        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                    <Link to={`/detail/${data.slug}`}><img src={`http://localhost:8000/storage/${data.thumbnail}`} alt="Recipe 1" className="w-100 rounded recipe-image" height="300"/></Link>
                </div>
                <div className="card-body pt-0">
                    <h3 className="mb-2">
                        <Link to={`/detail/${data.slug}`}>{data.title}</Link>
                    </h3>
                    <div className="mb-3">
                        {data?.ratings_avg == "0.0" && (<p>No Rating</p>)}
                        {data?.ratings_avg != "0.0" && [...Array(Math.floor(data.ratings_avg))].map((_,i) => (
                            <img src={FillStar} alt="Star" key={i} />
                        ))}
                        {data?.ratings_avg != "0.0" && [...Array(5 - Math.floor(data.ratings_avg))].map((_, i) => (
                            <img src={EmptyStar} alt="Star" key={i} />
                        ))}
                    </div>
                    <small>
                        Category: {data.category.name}
                    </small>
                </div>
            </div>
        </div>
    )
}