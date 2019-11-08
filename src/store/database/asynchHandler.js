import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,//returns a promise, and you can wait on it before proceeding. Calls the function when it completes.
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};


//Creating a new TodoList, and adding it to our database.
export const createNewListHandler = (firebase) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').add({
        name: "Unknown",
        owner: "Unknown",
        items: [],
    }).then(function(docRef){console.log("Newly Created Document ID: " + docRef.id)}).then(() => {
      dispatch(actionCreators.createTodoList);
    }).catch((err) => {
      dispatch({ type: 'CREATE_TODO_LIST_ERROR', err });
    });
};