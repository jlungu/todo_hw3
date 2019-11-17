import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import ItemsList from "./ItemsList.js";
import { firestoreConnect } from "react-redux-firebase";
import { editNameHandler } from "../../store/database/asynchHandler";
import { editOwnerHandler } from "../../store/database/asynchHandler";

class ListScreen extends Component {
  state = {
    name: "",
    owner: "",
  };


  handleChange = e => {
    const { target } = e;
    const { firebase } = this.props;
    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));
  };

  changeName = e => {
    const { target } = e;
    const { firebase } = this.props;
    this.props.editName(target.value, this.props.todoList.id, firebase);
  };

  changeOwner = e => {
    const { target } = e;
    const { firebase } = this.props;
    this.props.editOwner(target.value, this.props.todoList.id, firebase);
  };


  render() {
    const auth = this.props.auth;
    const todoList = this.props.todoList;
    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container white">
        <h5 className="grey-text text-darken-3">Todo List</h5>
        <div class="input-field col s6">
          <input
            className="active"
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
            defaultValue={todoList.name}
            onBlur={this.changeName}
          />
          <label class="active" for="name">
            Name
          </label>
        </div>
        <div className="input-field">
          <input
            className="active"
            type="text"
            name="owner"
            id="owner"
            onChange={this.handleChange}
            defaultValue={todoList.owner}
            onBlur={this.changeOwner}
          />
          <label class="active" for="owner">
            Owner
          </label>
        </div>

        <ItemsList todoList={this.props.todoList} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch, newItem) => ({
  editName: (newItem, id, firebase) =>
    dispatch(editNameHandler(newItem, id, firebase)),
  editOwner: (newItem, id, firebase) =>
    dispatch(editOwnerHandler(newItem, id, firebase))
  //submitItemChange: (id, newItemsList, firebase) =>
  //dispatch(submitItemChangeHandler(id, newItems, firebase))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ListScreen);
