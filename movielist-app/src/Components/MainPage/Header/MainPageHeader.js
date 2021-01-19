import React , { useState, useEffect, Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './MainPageHeader.css';
const MainPageHeader = (props) => {

    const goToProfilePage = () => {
    }
    return (
    <div className="mainPageHeader">
        <h1 className="header text-white">MovieList</h1>
        <Link to={'/profile_page'} >
            <button type="button" className="btn btn-info profile_button"> Profile</button>
        </Link>
    </div>
    );
}

export default MainPageHeader;