import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavLink, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { firestoreConnect } from "react-redux-firebase";
import TodoListLinks from "./TodoListLinks";
import { createNewListHandler } from "../../store/database/asynchHandler";

class HomeScreen extends Component {
  state ={
    newList: false,
    id: null,
  }
  handleSubmit = e => {
    e.preventDefault();

    const { props, state, firestore } = this;

    let todoList = {
      name: "Unknown",
      owner: "Unknown",
      items: [],
    }

    const db = this.props.firebase.firestore();
    const ref = db.collection('todoLists').doc();
    let id = ref.id;
    this.props.newList(todoList, id);
    this.setState({id: id})
    this.setState({newList: true});
  };


  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/login" />;
    }
    if (this.state.newList){
      return <Redirect to={'/todoList/' + this.state.id} key={this.state.id}/>;
    }
  

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m4">
            <TodoListLinks />
          </div>

          <div className="col s8">
            <div className="banner">
              @todo
              <br />
              List Maker
            </div>

            <div className="home_new_list_container">
              <Link to={"/todoList/"}>
                <button
                  type="submit"
                  className="home_new_list_button"
                  onClick={this.handleSubmit}
                >
                  Create a New To Do List
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    todoLists: state.firestore.ordered.todoLists,
    id: state.newId,
  };
};

const mapDispatchToProps = (dispatch, todoList, id) => ({
  newList: (todoList, id, firebase) => dispatch(createNewListHandler(todoList, id, firebase))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "todoLists" }])
)(HomeScreen);
