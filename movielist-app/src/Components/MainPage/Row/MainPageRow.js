import React , { useState, useEffect, Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';
import axios from '../../../API/axios';
import './MainPageRow.css';
import firebase from "firebase";



const MainPageRow = (props) => {
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
    const [movies, setMovies] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(props.fetchUrl);
            setMovies(request.data.results);
            // console.log(request.data.results);
           
            
            return request;

        }
    
        fetchData();
        
        
        
    },[props.fetchUrl])
    const goToMoviePage = async (index) => {
        const movieId = movies[index].id;

        
        props.history.replace(`/movie_page?movie_id=${movieId}`);
        
        
    }
    

    const renderItem2 = () => {
        return movies.map(
            (movie, index) =>
              movie.backdrop_path !== null && (
                <div className="item" key={movies[index].id} >
                    <div className="movie_image">
                        <img src={`${baseImgUrl}${movies[index].backdrop_path}`} alt={movies[index].title} onClick={() => goToMoviePage(index)}/>
                    </div>
                    
                    <div className="movie_subinfo">
                        <p className="movie_title">{movies[index].title}</p>
                        <p>Votes: {movies[index].vote_average} / 10</p>
                        <button className={(!props.checkIfMovieFavorited(movies[index])) ? "btn btn-outline-danger" : "btn btn-danger"} onClick={()=> props.addingOrRemovingMovie(movies[index])}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg></button>
                    </div>
                </div>
              )
        )
    }

    


    return (
        <div className="py-4">
            <div className="row_title"> 
                <h2 className="title-section text-white"> {props.title} </h2>
            </div>
                <div className="row_posters">
                    {
                        renderItem2()
                    }
                </div>                    
        </div>
    );

}

export default withRouter(MainPageRow);