import React , { useState, useEffect, Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';
import MainPageHeader from './Header/MainPageHeader';
import MainPageRow from './Row/MainPageRow';
import {requestsByGenre} from '../../API/requests';
import firebase from "firebase";
import "firebase/auth";
import { firebaseConfig } from '../../API/firebase';
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseAuthedAnd
  } from "@react-firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from '../../API/firebase';
import './MainPage.css';

 
  

const MainPage = () => {

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    const [favMoviesId, setfavMoviesId] = useState([]);
    const [favGenres, setGenres] = useState([]);
    const [favMovieTitles, setfavMovieTitles] = useState([]);
    const [favMovieImgs, setfavMoviesImgs] = useState([]);
    const [favMovieVotes, setfavMovieVotes] = useState([]);


    

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        // const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        //                                     setIsSignedIn(!!user);
        //                                 });
        const unregisterAuthObserver = app.auth().onAuthStateChanged(user => {
                                                setIsSignedIn(!!user);
                                            });

        
        
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    useEffect(() => {
        const fetchDataFirebase = async () => {
            console.log("here");
            if (isSignedIn) {
                const docRef = db.collection("accounts").doc(`${app.auth().currentUser.uid}`);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        setfavMovieTitles(doc.data().favoriteMovieTitles);
                        setfavMoviesId(doc.data().favoriteMoviesId);
                        setfavMoviesImgs(doc.data().favoriteMovieImgs);
                        setGenres(doc.data().favoriteGenres);
                        setfavMovieVotes(doc.data().favoriteMovieVotes);
                    } else {
                        console.log("No such document!");
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

    // !firebase.apps.length ?  firebase.initializeApp(firebaseConfig) : firebase.app();

    const db = app.firestore();
    const uiConfig = {
        signInFlow: 'popup',
        
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    };
    
    const addFavoriteMovie = (favoriteMovieId, favoriteMovieImg, favoriteMovieTitle, favoriteMovieVotes) => {
        
        setfavMoviesId([...favMoviesId, favoriteMovieId]);
        setfavMoviesImgs([...favMovieImgs, favoriteMovieImg]);
        setfavMovieTitles([...favMovieTitles , favoriteMovieTitle]);
        setfavMovieVotes([...favMovieVotes, favoriteMovieVotes]);
        
        console.log("adding2")
        console.log(favMoviesId);

    }
    
    const removeFavoriteMovie = (favoriteMovieId, favoriteMovieImg, favoriteMovieTitle, favoriteMovieVotes) => {
        
        
        // console.log(favMoviesId.filter(id => id == favoriteMovieId))
        setfavMoviesId(favMoviesId.filter(id => id != favoriteMovieId));
        setfavMoviesImgs(favMovieImgs.filter(img => img != favoriteMovieImg));
        setfavMovieTitles(favMovieTitles.filter(title => title != favoriteMovieTitle));
        setfavMovieVotes(favMovieVotes.filter(votes => votes != favoriteMovieVotes));

    }

    const addingOrRemovingMovie = (movieInfo) => {
        for (let i = 0; i < favMoviesId.length; i++) {
            if (movieInfo.id == favMoviesId[i]) {
                removeFavoriteMovie(movieInfo.id, movieInfo.backdrop_path, movieInfo.title, movieInfo.vote_average)
                return
            } 
        }
        
        addFavoriteMovie(movieInfo.id, movieInfo.backdrop_path, movieInfo.title, movieInfo.vote_average) ;
        
        // console.log(favMoviesId);
    }

    const checkIfMovieFavorited = (movieInfo) => {
        for (let i = 0; i < favMoviesId.length; i++) {
            if (movieInfo.id == favMoviesId[i]) {
                return true;
            } 
        }
        return false;
        
    }
    

    if (!isSignedIn) {
        return (
            <div className="sign_in_page">
                <h1 className="header2 text-white">MovieList</h1>
                <div className="sign_in text-white">Please sign-in:</div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
            </div>
        );
    } else {

        return (
            
                <div className="MainPage">
                    <MainPageHeader/>
                    <MainPageRow title="Action" fetchUrl={requestsByGenre.getAction} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="Comedy" fetchUrl={requestsByGenre.getComedy} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="Mystery" fetchUrl={requestsByGenre.getMystery} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="Romance" fetchUrl={requestsByGenre.getRomance}  addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="Adventure" fetchUrl={requestsByGenre.getAdventure} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="Animation" fetchUrl={requestsByGenre.getAnimation} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="Crime" fetchUrl={requestsByGenre.getCrime} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="Thriller" fetchUrl={requestsByGenre.getThriller} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="Documentary" fetchUrl={requestsByGenre.getDocumentary} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="Science Fiction" fetchUrl={requestsByGenre.getScienceFiction} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    <MainPageRow title="History" fetchUrl={requestsByGenre.getHistory} addingOrRemovingMovie={addingOrRemovingMovie} checkIfMovieFavorited={checkIfMovieFavorited}/>
                    
                </div>       
        );
    }
}

export default withRouter(MainPage);