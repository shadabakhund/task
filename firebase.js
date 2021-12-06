import  firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB2juAhdZxWsSAUu-iP0YImLpBEBUOSilc",
    authDomain: "test-ffc10.firebaseapp.com",
    projectId: "test-ffc10",
    storageBucket: "test-ffc10.appspot.com",
    messagingSenderId: "99508001459",
    appId: "1:99508001459:web:c338151b7b833f09a36ec6"
  };


if(firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;