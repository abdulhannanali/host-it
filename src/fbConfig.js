/**
 * Splitting of firebaes modules is handled by script tags
 * In case of removal of scripts add separate modules here
 */
import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0kYsMQyug5fcSHOK4k8-4voTD6h9eYog",
    authDomain: "host-it.firebaseapp.com",
    databaseURL: "https://host-it.firebaseio.com",
    storageBucket: "host-it.appspot.com",
    messagingSenderId: "45342794364"
};

firebase.initializeApp(config);