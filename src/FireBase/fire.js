import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication
import 'firebase/database'; // for realtime database // for cloud firestore
import 'firebase/messaging'; // for cloud messaging

const firebaseConfig = {
    apiKey: 'AIzaSyACffbSSbuNfxU9Ey_YZLLVF7yj1gKio9M',
    authDomain: 'login-202d6.firebaseapp.com',
    projectId: 'login-202d6',
    storageBucket: 'login-202d6.appspot.com',
    messagingSenderId: '262794364337',
    appId: '1:262794364337:web:8777e5c695f974295ba990',
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
