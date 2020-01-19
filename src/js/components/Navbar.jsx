import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import authAPI from '../services/authAPI';
import recipesAPI from '../services/recipesAPI';
    
//todo boucler sur les categories

const Navbar = ({ history }) => {
    const [categories, setCategories] = useState([])

    useEffect( () => {
        fetchCategories();
    }, [])

    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext);
    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        setIsAdmin(false);
        history.push("/login");
    } 

    const fetchCategories = async() => {
        try {
            const { categories } = await recipesAPI.getCategories()
            setCategories(categories)
        } catch(err) {
            console.log(err.response)
        }
    }

    const categotyList = categories.map( category => 
        <li className="nav-item" key={ category.id }>
            <NavLink className="nav-link lead" to={ "/recipes/" + category.name }>{ category.name }</NavLink>
        </li>
    )

    return ( 
        <header className="fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Super Tomate</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        { categotyList }
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        { !isAuthenticated &&
                            <>
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link lead">Inscription</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="btn btn-success lead">Connexion</NavLink>
                                </li>
                            </> || <>
                                { isAdmin &&
                                    <li className="nav-item">
                                        <NavLink className="nav-link lead" to="/dashboard">Dashboard</NavLink>
                                    </li>
                                }
                                <li className="nav-item">
                                        <NavLink to="/addRecipe" className="nav-link lead">Nouvelle recette</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        onClick={handleLogout}
                                        className="btn btn-danger"
                                    >Déconnexion</button>
                                </li>
                            </> 
                        }
                    </ul>
                </div>
            </nav>
        </header>    
    );
};
 
export default Navbar;