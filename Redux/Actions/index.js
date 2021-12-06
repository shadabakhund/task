import { USER_STATE_CHANGE, USERS_DATA_STATE_CHANGE } from "../Constants";
import firebase from "firebase"
require('firebase/firestore')

export function fetchUser(){
    return(dispatch) => {
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser?.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                dispatch({type: USERS_DATA_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else{
                console.log('Does Not Exists')
            }
        })
    }
}