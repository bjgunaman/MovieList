import React , { useState, useEffect, Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MainPage from './Components/MainPage/MainPage';
import MoviePage from './Components/MoviePage.js/MoviePage';


const API_KEY = "b306339ebb5b313ade8f867891116f10";
function App() {
  return (
    <Router>
      <Route exact path="/" component={MainPage} /> 
      <Route path="/movie_page" component={MoviePage} /> 
      {/* <Route path="/chat" component={Chat} /> */}
    </Router>
  );
}

export default App;
