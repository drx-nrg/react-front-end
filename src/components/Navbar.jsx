import { useContext, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import AuthContext from '../AuthContext';

export default function Navbar(){
    const isLoggedIn = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
            <div className="container">
                <Link to={'/discover-recipes'} className="navbar-brand fw-bold">IndoRecipe</Link>
                <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to={'/discover-recipes'} className="nav-link">Discover Recipes</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0" id='navbarNavDropdown'>
                    {!isLoggedIn && (
                        <>
                            <li className="nav-item">
                                <Link to="/auth/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/auth/register" className="nav-link">Register</Link>
                            </li>
                        </>
                    )}
                    {isLoggedIn && (
                        <> 
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/auth/logout" className="nav-link">Logout</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}