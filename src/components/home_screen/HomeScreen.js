import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { createNewListHandler } from  '../../store/database/asynchHandler';

class HomeScreen extends Component {
    handleSubmit = (e) => {
        e.preventDefault();

        const { props, state } = this;
        const todoLists = this.props.todoLists;
        props.newList();
        let id = null;
        for (let i = 0; i < todoLists.length; i++){
            if (todoLists[i].name === "Unknown" && todoLists[i].owner === "Unknown"){
                id = todoLists[i].id;
            }
        }
            //this.props.history.push('/todoList/' + id);
      }


    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleSubmit}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        todoLists: state.firestore.ordered.todoLists,
    };
};

const mapDispatchToProps = dispatch => ({
    newList: (firebase) => dispatch(createNewListHandler(firebase)),
  });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);