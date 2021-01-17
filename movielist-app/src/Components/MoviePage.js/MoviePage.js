import instance from '../../API/axios';
import React , { useState, useEffect, Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';
import {requestMovieByIdWithCred, generateRequestMovieInfoImdb} from '../../API/requests';
import axios from 'axios';
import './MoviePage.css';


const MoviePage = () => {
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
    const [movieInfo, setMovieInfo] = useState({});
    const [imdbInfo, setImdbInfo] = useState({});
    const [casts, setCastsInfo] = useState([]);
    const [crew, setCrewInfo] = useState([]);
    const [ratings, setRatings] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const movieId = urlSearchParams.get("movie_id");
            console.log(movieId);
            const getMovieUrl = requestMovieByIdWithCred(movieId);
            console.log(getMovieUrl);
            instance.get(getMovieUrl)
                    .then(async (response) => {
                        setMovieInfo(response.data)
                        const options = generateRequestMovieInfoImdb(response.data.imdb_id);
                        axios.request(options)
                            .then(response => {
                                setImdbInfo(response.data)
                                setRatings(response.data.Ratings);
                                // setRatings(response.data.Ratings)
                                
                                return response;
                            })
                            .catch(error => console.log(error))
                        return response;
                    })
                    .catch(error => console.log(error))
            
            
        }
        fetchData();
        console.log(imdbInfo);
        console.log(movieInfo);
    },[])

    const mystyle = { 
                        backgroundImage: `url(${baseImgUrl}${movieInfo.backdrop_path})`
                    }



    return (
       
        <div className= "movie_page_bg" style={mystyle}>
            <div className="black_background">
                <div className="movie_meta">
                    <div className="movie_page_title">
                        <h1>{movieInfo.title}</h1>
                    </div>
                    <br />
                    
                    <div className="movie_page_summary">{imdbInfo.Plot}</div>
                    <br />
            
                
                    <div className="movie_mini_info"> <p className="bold">Genre:</p> {imdbInfo.Genre}</div>
                    <div className="movie_mini_info"> <p className="bold">Director:</p> {imdbInfo.Director} </div>
                    <div className="movie_mini_info"> <p className="bold">Writer:</p> {imdbInfo.Writer} </div>
                    <div className="movie_mini_info"> <p className="bold">Actor:</p> {imdbInfo.Actors} </div>
                    <div className="movie_mini_info"> <p className="bold">Production: </p>{imdbInfo.Production} </div>
                    <div className="movie_mini_info"> <p className="bold">Runtime: </p>{movieInfo.runtime} </div>
                    <div className="movie_mini_info"> <p className="bold">Rating: </p>{imdbInfo.Rated} </div>
                    <div className="movie_mini_info"> <p className="bold">Language: </p>{imdbInfo.Language} </div>
                    <div className="ratings_area movie_mini_info">
                        {console.log(imdbInfo)}
                        
                        {
                            
                            ratings.map((ratingsInfo, index) => {
                                return <div className="each_ratings" key={index}><p className="bold">{ratingsInfo.Source}:</p> {ratingsInfo.Value}</div>
                            })
                        } 
                    </div>
                    

        
                </div>

            </div>
            
        </div>
        
        
    )


}


export default withRouter(MoviePage);