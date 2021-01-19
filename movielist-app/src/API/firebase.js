import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAdAOTClkyKzkLAFwz0iEhPGfXfuBRUw-8",
    authDomain: "movielist-ab0e7.firebaseapp.com",
    databaseURL: "https://movielist-ab0e7.firebaseio.com",
    projectId: "movielist-ab0e7",
    storageBucket: "movielist-ab0e7.appspot.com",
    messagingSenderId: "499054733310",
    appId: "1:499054733310:web:1176afcef6112e0a3882af",
    measurementId: "G-MEASUREMENT_ID"
};
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    login(email,password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }
    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName;
    }

    verifyEmail() {
        this.auth.currentUser.sendEmailVerification()
            .then(() => {
                //email sent
            })
            .catch((error) => {
                alert(error.message);
            })
    }

    getVerified() {
        return this.auth.currentUser.emailVerified;
    }


}


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();



