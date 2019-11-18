// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CREATE_TODO_LIST = 'CREATE_TODO_LIST';
export const CREATE_TODO_LIST_ERROR = 'CREATE_TODO_LIST_ERROR';
export const CREATE_TODO_LIST_ITEM = 'CREATE_TODO_LIST_ITEM';
export const CREATE_TODO_LIST_ITEM_ERROR = 'CREATE_TODO_LIST_ITEM_ERROR';
export const EDIT_TODO_LIST_ITEM = 'LOGOUT_SUCCESS';
export const EDIT_TODO_LIST_ITEM_ERROR = 'LOGOUT_SUCCESS';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) { 
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
export function createTodoList() {
    return {
        type: 'CREATE_TODO_LIST',
    }
}
export function createTodoListError(error) {
    return {
        type: 'CREATE_TODO_LIST_ERROR',
        error
    }
}
// CREATE TODO LIST ITEMS
export function createTodoListItem(todoLists) {
    return {
        type: 'CREATE_TODO_LIST_ITEM',
        todoLists
    }
}
export function createTodoListItemError(error) {
    return {
        type: 'CREATE_TODO_LIST_ITEM_ERROR',
        error
    }
}

//EDITING TODO LIST ITEMS
export function editTodoListItem(todoList, item) {
    return {
        type: 'EDIT_TODO_LIST_ITEM',
        todoList,
        item
    }
}
export function editTodoListItemError(error) {
    return {
        type: 'EDIT_TODO_LIST_ITEM_ERROR',
        error
    }
}


