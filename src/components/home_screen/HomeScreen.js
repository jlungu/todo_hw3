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
    firstTodo: null,
  }
    
  updateId = (id) => {
    this.setState({id: id});
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

  updateFirstTodo = (newTodo) => {
    console.log.apply(this.props.todoList);
  }




  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/login" />;
    }
    if (this.state.newList){
      return <Redirect to={'/todoList/' + this.state.id} key={this.state.id}/>;
    }

   {this.updateFirstTodo()}
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m4">
            <TodoListLinks firstTodo={this.state.firstTodo} updateFirstTodo={this.updateFirstTodo} updateId={this.updateId}/>
          </div>

          <div className="col s8">
            <div className="banner">
              @todo
              <br />
              List Maker
            </div>

            <div className="home_new_list_container">
              <Link to={"/todoList/"}>
                <a class="waves-effect waves-light btn-large orange"
                  type="submit"
                  id="create_list"
                  onClick={this.handleSubmit}
                >
                  Create a New To Do List
                </a>
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
