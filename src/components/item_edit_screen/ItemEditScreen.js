import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { editNameHandler } from "../../store/database/asynchHandler";
import { editOwnerHandler } from "../../store/database/asynchHandler";

class ItemEditScreen extends Component {
  render() {
    const todoList = this.props.todoList;
    const item = todoList.items[this.props.match.params.key];
    return (
      <div className="container white">
        <h5 className="grey-text text-darken-3">Edit Item</h5>
          <div class="input-field col s6">
            <input
              className="active"
              type="text"
              name="assigned_to"
              id="assigned_to"
              defaultValue={item.assigned_to}
            />
            <label class="active" for="assigned_to">
              Assigned To
            </label>
          </div>
          <div class="input-field col s6">
          <input
            className="active"
            type="text"
            name="description"
            id="description"
            defaultValue={item.description}
          />
          <label class="active" for="description">
            Description
          </label>
        </div>
        <div class="input-field col s6">
          <input
            className="active"
            type="text"
            name="due_date"
            id="due_date"
            defaultValue={item.due_date}
          />
          <label class="active" for="due_date">
            Due Date
          </label>
        </div>
        <div>
        <label>
          <input
            type="checkbox"
            class="filled-in"
            defaultChecked={item.completed}
          />
          <span>Completed</span>
        </label>  
        </div>
        <div>
        <button class="btn waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
        </button>
        <a class="waves-effect waves-light btn">Cancel</a>
        </div>
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
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ItemEditScreen);
