import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
        apiKey: "AIzaSyD2ARzycv5567O6oxhb27NCKfm1h_Vt30c",
        authDomain: "jlungu-todo-hw3-921af.firebaseapp.com",
        databaseURL: "https://jlungu-todo-hw3-921af.firebaseio.com",
        projectId: "jlungu-todo-hw3-921af",
        storageBucket: "jlungu-todo-hw3-921af.appspot.com",
        messagingSenderId: "538651759915",
        appId: "1:538651759915:web:9d089329c04a18755d216e",
        measurementId: "G-X2DKWRKXCL"
      };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;