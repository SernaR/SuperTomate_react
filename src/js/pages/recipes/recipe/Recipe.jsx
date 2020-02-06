import React, { useState, useEffect } from 'react';
import recipesAPI from '../../../services/recipesAPI';
import Header from './RecipeHeader'
import Ingredients from './RecipeIngredients';
import Steps from './RecipeSteps';
import Footer from '../../../components/Footer';
import Comments from '../../../components/comments/Comments';
import AddComment from '../../../components/comments/AddComment';

//todo afficher addcomment si loggué

const Recipe = ({ match }) => {
    const [recipe, setRecipe] = useState({
        name: '',
        serve: '',
        making: '',
        cook: '',
        difficulty: '',
        ingredients: [],
        steps: []
    })

    useEffect(() => {
        fetchRecipe(match.params.id)
    }, [])

    const fetchRecipe = async (id) => {
        try {
            const {recipe} = await recipesAPI.find(id)
            setRecipe(recipe)
        } catch(err) {
            console.log(err.response)
        }
    }

    return ( 
        <>
            <main>
                <div className="container bg-white card p-3 mb-3" style={{ marginTop: '80px'}}>
                    <h1 className="display-2 text-center py-4">{ recipe.name }</h1>  
                    <p className="text-center mb-4 ">
                        <i className="fas fa-heart text-danger mx-1"></i>
                        <i className="fas fa-heart text-danger mx-1"></i>
                        <i className="fas fa-heart text-danger mx-1"></i>
                        <i className="fas fa-heart text-danger mx-1"></i>
                        <i className="far fa-heart text-danger mx-1"></i> 
                    </p> 
                    <Header recipe={recipe} />
                    <Ingredients ingredients={recipe.ingredients}/>
                    <Steps steps={recipe.steps}/>
                </div>
                <AddComment commentId={ match.params.id }/>
                <Comments />
            </main>
            <Footer/>
        </>
        
        
    );
}
 
export default Recipe;