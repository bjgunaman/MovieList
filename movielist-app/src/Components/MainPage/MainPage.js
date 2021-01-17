import React , { useState, useEffect, Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';
import MainPageHeader from './Header/MainPageHeader';
import MainPageRow from './Row/MainPageRow';
import {requestsByGenre} from '../../API/requests';

const MainPage = () => {
    return (
        <div className="MainPage">
            <MainPageHeader/>
            <MainPageRow title="Action Movies" fetchUrl={requestsByGenre.getAction}/>
        </div>
        
    );
}

export default withRouter(MainPage);