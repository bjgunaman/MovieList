import React , { useState, useEffect, Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';

import {requestsByGenre} from '../../API/requests';
import firebase from "firebase";
import app from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../API/firebase';
import "./ProfilePage.css";

const ProfilePage = (props) => {
    const [favMoviesId, setfavMoviesId] = useState([]);
    const [favGenres, setGenres] = useState([]);
    const [favMovieTitles, setfavMovieTitles] = useState([]);
    const [favMovieImgs, setfavMoviesImgs] = useState([]);
    const [favMovieVotes, setfavMovieVotes] = useState([]);
    const db = firebase.firestore();
    useEffect(() => {
        const fetchDataFirebase = async () => {
            console.log("here");
            
            const docRef = db.collection("accounts").doc(`${firebase.auth().currentUser.uid}`);
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
        fetchDataFirebase();
    },[]);

    return (
        <div>
            <div>
                <img src={`${firebase.auth().currentUser.photoURL}`} className="profile_picture" />
            </div>
            <div className="display_name">
                <h1>{firebase.auth().currentUser.displayName}</h1>

            </div>

        </div>
    )
}

export default withRouter(ProfilePage);