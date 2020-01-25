import React, { useState, useContext } from 'react';
import authAPI from '../services/authAPI';
import authContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import Cockpit from '../components/Cockpit';

const LoginPage = ({ history }) => {
    const { setIsAuthenticated, setIsAdmin } = useContext(authContext);
    
    const [credentials, setCredentials] = useState({
        email: "sblack@gmail.fr",
        password: "password0"
    });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setCredentials({ ...credentials, [name]: value })
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try{
            await authAPI.authenticate(credentials);
            
            setIsAuthenticated(true);
            setIsAdmin(authAPI.isAdmin())

            setError('');
            history.replace("/addRecipe");
        } catch(error) {
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas")
            console.log(error.response)
        }
    }

    return (
        <main>
            <div className="container">
                <div className="card px-4"> 
                    <form onSubmit={handleSubmit}>
                        <Cockpit title="Connexion à l'application" />
                        <Field 
                            name="email" 
                            label="Adresse email" 
                            value={credentials.email} 
                            onChange={handleChange}
                            placeholder="Adresse email de connexion"
                            type="email" 
                            error ={error}
                        /> 
                        <Field 
                            name="password" 
                            label="Mot de passe" 
                            value={credentials.password}
                            onChange={handleChange}
                            type="password" 
                        
                        />        
                        <div className="form-group">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                            >Je me connecte</button>
                        </div>
                    </form>
                </div>    
            </div>  
        </main>
    );
}
 
export default LoginPage;