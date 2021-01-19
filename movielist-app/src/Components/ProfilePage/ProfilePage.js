import React , { useState, useEffect, Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';

import {requestsByGenre} from '../../API/requests';
import firebase from "firebase";
import app from "../../API/firebase";
import "firebase/auth";
// import { firebaseConfig } from '../../API/firebase';
import "./ProfilePage.css";

const ProfilePage = (props) => {

    const [profilePic, setProfilePic] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false); 
    const [favMoviesId, setfavMoviesId] = useState([]);
    const [favGenres, setGenres] = useState([]);
    const [favMovieTitles, setfavMovieTitles] = useState([]);
    const [favMovieImgs, setfavMoviesImgs] = useState([]);
    const [favMovieVotes, setfavMovieVotes] = useState([]);
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
    const db = app.firestore();

    useEffect(() => {
        const unregisterAuthObserver = app.auth().onAuthStateChanged(user => {
                                                setIsSignedIn(!!user);
                                            });

        return () => unregisterAuthObserver(); 
    }, []);
    useEffect(() => {
        const fetchDataFirebase = async () => {
            
            if(isSignedIn) {
                const docRef = db.collection("accounts").doc(`${app.auth().currentUser.uid}`);
                setProfilePic(app.auth().currentUser.photoURL);
                setDisplayName(app.auth().currentUser.displayName);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        
                        setfavMovieTitles(doc.data().favoriteMovieTitles);
                        setfavMoviesId(doc.data().favoriteMoviesId);
                        setfavMoviesImgs(doc.data().favoriteMovieImgs);
                        setGenres(doc.data().favoriteGenres);
                        setfavMovieVotes(doc.data().favoriteMovieVotes);
                    } else {
                        
                        docRef.set({
                            favoriteMoviesId:[],
                            favoriteGenres: [],
                            favoriteMovieImgs: [],
                            favoriteMovieTitles:[],
                            favoriteMovieVotes:[]
                        })
                    }
                
                })
            }
            
            
            
        }
        fetchDataFirebase();
    },[isSignedIn]);
    useEffect(() => {
        const editFavoriteMovieToFirestore = () => {
            if (isSignedIn) {
                db.collection("accounts").doc(`${app.auth().currentUser.uid}`).set({
                    favoriteMoviesId:favMoviesId,
                    favoriteGenres: favGenres,
                    favoriteMovieImgs: favMovieImgs,
                    favoriteMovieTitles:favMovieTitles,
                    favoriteMovieVotes: favMovieVotes
                })
            }
        }
        editFavoriteMovieToFirestore();
    },[favMoviesId, favMovieVotes, favMovieTitles, favMovieImgs]);

    const renderTableRow = () => {
        const length = favMoviesId.length;
        let index = 0;
        let result = []
        while (index < length) {
            const tableData = renderTableData(index, length)
            const row = (
                <tr>
                    {
                        tableData.map(tableDat => {
                            return (
                                <td>
                                    {tableDat}
                                </td>
                            );
                        })
                    }
                </tr>
            )
            index += 3;
            result.push(row)
            
        }
        return result;
    }
    const renderTableData = (startIndex, length) => {
        let result = []
        for (let i = 0; i < 3; i++) {
            if(startIndex + i >= length) {
                break;
            }
            result.push(
                
                <div className="item" key={favMoviesId[startIndex + i]} >
                    <div className="movie_image">
                        <Link to={`/movie_page?movie_id=${favMoviesId[startIndex + i]}}`}>
                            <img src={`${baseImgUrl}${favMovieImgs[startIndex + i]}`} alt={favMovieTitles[startIndex + i]} />
                        </Link>
                    </div>
                    
                    <div className="movie_subinfo">
                        <p className="movie_title">{favMovieTitles[startIndex + i]}</p>
                        <p>Votes: {favMovieVotes[startIndex + i]} / 10</p>
                        <button className={(!checkIfMovieFavorited(favMoviesId[startIndex + i])) ? "btn btn-outline-danger" : "btn btn-danger"} onClick={()=> addingOrRemovingMovie(favMoviesId[startIndex + i],favMovieImgs[startIndex + i], favMovieTitles[startIndex + i], favMovieVotes[startIndex + i])}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg></button>
                    </div>
                </div>

            
            )
        }
        return result

    }

    const checkIfMovieFavorited = (id) => {
        for (let i = 0; i < favMoviesId.length; i++) {
            if (id == favMoviesId[i]) {
                return true;
            } 
        }
        return false;
        
    }
    const addFavoriteMovie = (favoriteMovieId, favoriteMovieImg, favoriteMovieTitle, favoriteMovieVotes) => {
        
        setfavMoviesId([...favMoviesId, favoriteMovieId]);
        setfavMoviesImgs([...favMovieImgs, favoriteMovieImg]);
        setfavMovieTitles([...favMovieTitles , favoriteMovieTitle]);
        setfavMovieVotes([...favMovieVotes, favoriteMovieVotes]);
        
        

    }
    
    const removeFavoriteMovie = (favoriteMovieId, favoriteMovieImg, favoriteMovieTitle, favoriteMovieVotes) => {
        setfavMoviesId(favMoviesId.filter(id => id != favoriteMovieId));
        setfavMoviesImgs(favMovieImgs.filter(img => img != favoriteMovieImg));
        setfavMovieTitles(favMovieTitles.filter(title => title != favoriteMovieTitle));
        setfavMovieVotes(favMovieVotes.filter(votes => votes != favoriteMovieVotes));

    }

    const addingOrRemovingMovie = (favoriteMovieId, favoriteMovieImg, favoriteMovieTitle, favoriteMovieVotes) => {
        for (let i = 0; i < favMoviesId.length; i++) {
            if (favoriteMovieId == favMoviesId[i]) {
                removeFavoriteMovie(favoriteMovieId, favoriteMovieImg, favoriteMovieTitle, favoriteMovieVotes)
                return
            } 
        }
        
        addFavoriteMovie(favoriteMovieId, favoriteMovieImg, favoriteMovieTitle, favoriteMovieVotes) ;
        
        
    }
    const firebaseSignout = () => {
        app.auth().signOut()
            .then(() => {
                console.log("SUCCESS");
            })
            .catch((error) => {
                console.log(error);
            
          } );
    }
    
    return (
        <div className="profile_page">
            <div className="profile_picture">
                <img src={`${profilePic}`} className="profile_img"  />
            </div>
            <Link to={"/"}>
                <button type="button" className="btn btn-outline-danger signout_button" onClick={() => firebaseSignout()}>Sign out</button>
            </Link>
            <div >
                <h1 className="display_name text-white">{displayName}</h1>
                <div className="favorites">
                    <h2 className="fav_movie_list text-white">Favorites</h2>
                </div>
                
                <table className="fav_movie_list">
                    <tbody>
                        {renderTableRow().map(tableRow => tableRow)}
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default withRouter(ProfilePage);