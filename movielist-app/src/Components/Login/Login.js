// import React, { useState } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// // import './Login.css';
// import firebase from "firebase/app";
// import "firebase/auth";
// import {
//     FirebaseAuthProvider,
//     FirebaseAuthConsumer,
//     IfFirebaseAuthed,
//     IfFirebaseAuthedAnd
//   } from "@react-firebase/auth";

// import {firebaseConfig} from '../../API/firebase';

// function Login(props) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     return (
//         <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
//             <div>
//                 <button
//                     onClick={() => {
//                     const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
//                     firebase.auth().signInWithPopup(googleAuthProvider);
//                     }}
//                 >
//                     Sign In with Google
//                 </button>
//             </div>
//         </FirebaseAuthProvider>
//       );
// }

// export default withRouter(Login);