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
export const createNewListHandler = (todoList, id, firebase) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').doc(id).set({
        name: todoList.name,
        owner: todoList.owner,
        items: todoList.items,
    }).then(function(docRef) {id = docRef.id}).then(() => {dispatch(actionCreators.createTodoList(todoList, id))}).catch((err) => {
      dispatch({ type: 'CREATE_TODO_LIST_ERROR', err });
    });

    firestore.collection('todoLists').orderBy("name").limit(3);
};

export const editNameHandler = (newName, id, firebase) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').doc(id).update({
      name: newName,
    }).catch((err) => {
      dispatch({ type: 'CREATE_TODO_LIST_ERROR', err });
    });
    
  }

  export const editOwnerHandler = (newOwner, id, firebase) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').doc(id).update({
      owner: newOwner,
    }).catch((err) => {
      dispatch({ type: 'CREATE_TODO_LIST_ERROR', err });
    });
  }

  export const submitItemChangeHandler = (id, newItems, firebase) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').doc(id).update({
      items: newItems,
    }).then(() => {
      //dispatch(actionCreators.createTodoListItem(firestore.collection('todoLists').get()))
      console.log(firestore.collection('todoLists'))
    }).catch((err) => {
      dispatch({ type: 'CREATE_TODO_LIST_ERROR', err });
    });
  }

  export const deleteListHandler = (id, firebase) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').doc(id).delete().then(function() {
      console.log("Document with id " + id + " successfully deleted!");
  }).catch((err) => {
      dispatch({ type: 'CREATE_TODO_LIST_ERROR', err });
    });
};

export const moveCurrentListToTopHandler = (todoLists, firebase) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  firestore.collection('todoLists').add({
    todoLists,
  }
  ).then(function() {
    console.log("TodoList moved to top!");
}).catch((err) => {
    dispatch({ type: 'CREATE_TODO_LIST_ERROR', err });
  });
};


  