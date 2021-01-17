import React , { useState, useEffect, Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';
import axios from '../../../API/axios';
import './MainPageRow.css';




const MainPageRow = (props) => {
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(props.fetchUrl);
            setMovies(request.data.results);
            console.log(request.data.results);
           
            
            return request;

        }
        fetchData();
        
        
        
    },[props.fetchUrl])
    const goToMoviePage = async (index) => {
        const movieId = movies[index].id;

        // const reply = fetch('/storeMovieId', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({movieId: movieId})
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log("inHere");
            
        //     return data
        // })
        // .catch(error => {
        //     console.log(error)
        // })
        props.history.replace(`/movie_page?movie_id=${movieId}`);
        
        
    }


    const renderItem = (index) => {
        if (movies.length <= 0) {
            return 
        } else {
            const i = Math.floor(index / 5);
            const nextI = (i + 1) % 4;
            var prevI = (i-1)%4 ;
            if (prevI < 0) {
                prevI = 3;
            }
            console.log(i);
            return movies.length > 0 &&(
            <section id={`section${i}`} key={i}>
                <a href={`#section${prevI}`}>‹</a>
                    <div className="item" key={movies[index].id} onClick={() => goToMoviePage(index)}>
                        <div>
                            {movies[0].backdrop_path !== null && <img src={`${baseImgUrl}${movies[index].backdrop_path}`} alt={movies[index].title}/>} 
                        </div>
                        <div className="movie_subinfo">
                            <p >{movies[index].title}</p>
                            <p>Votes: {movies[index].vote_average} / 10</p>
                        </div>
                        
                    </div>
                    <div className="item" key={movies[index + 1].id}>
                        <div>
                            <img src={`${baseImgUrl}${movies[index + 1].backdrop_path}`} alt={movies[index + 1].title}/>
                        </div>
                        <div className="movie_subinfo">
                            <p className="movie_title">{movies[index + 1].title}</p>
                            <p>Votes: {movies[index + 1].vote_average} / 10</p>
                        </div>
                        
                    </div>
                    <div className="item" key={movies[index + 2].id}>
                        <div>
                            <img src={`${baseImgUrl}${movies[index + 2].backdrop_path}`} alt={movies[index + 2].title}/>
                        </div>
                        <div className="movie_subinfo">
                            <p className="movie_title">{movies[index + 2].title}</p>
                            <p>Votes: {movies[index + 2].vote_average} / 10</p>
                        </div>
                    </div>
                    <div className="item" key={movies[index + 3].id}>
                        <div  >
                            <img src={`${baseImgUrl}${movies[index + 3].backdrop_path}`} alt={movies[index + 3].title}/>
                        </div>
                        
                        <div className="movie_subinfo">
                            <p className="movie_title">{movies[index + 3].title}</p>
                            <p>Votes: {movies[index + 3].vote_average} / 10</p>
                        </div>
                    </div>
                    <div className="item" key={movies[index + 4].id}>
                        <div>
                            <img src={`${baseImgUrl}${movies[index + 4].backdrop_path}`} alt={movies[index + 4].title}/>
                        </div>
                        
                        <div className="movie_subinfo">
                            <p className="movie_title">{movies[index + 4].title}</p>
                            <p>Votes: {movies[index + 4].vote_average} / 10</p>
                        </div>
                    </div>
                <a href={`#section${nextI}`}>›</a>
            </section>);
    
        }
        
    }


    return (
        <div>
            <div className="row_title"> 
                <h2> Action Movies </h2>
            </div>
            <div className="row">
                
                <div className="row_posters">
                    {
                        renderItem(0)
                    }
                    {
                        renderItem(5)
                    }
                    {
                        renderItem(10)
                    }
                    {
                        renderItem(15)
                    }
                    
                            
                </div>
                    
            </div>
        </div>
    );

}

export default withRouter(MainPageRow);