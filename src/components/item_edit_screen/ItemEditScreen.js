import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { editNameHandler } from "../../store/database/asynchHandler";
import { submitItemChangeHandler } from "../../store/database/asynchHandler";

class ItemEditScreen extends Component {
  state = {
    item: this.props.todoList.items[this.props.match.params.key],
    editList: true,
    newItem:
      this.props.match.params.key != this.props.todoList.items.length
        ? true
        : false,
    description:
      this.props.match.params.key != this.props.todoList.items.length
        ? this.props.todoList.items[this.props.match.params.key].description
        : "",
    assigned_to:
      this.props.match.params.key != this.props.todoList.items.length
        ? this.props.todoList.items[this.props.match.params.key].assigned_to
        : "",
    due_date:
      this.props.match.params.key != this.props.todoList.items.length
        ? this.props.todoList.items[this.props.match.params.key].due_date
        : "",
    completed:
      this.props.match.params.key != this.props.todoList.items.length
        ? this.props.todoList.items[this.props.match.params.key].completed
        : false
  };

  componentDidMount() {
    this.setState({ editList: true });
    this.setState({ newItem: false });
  }

  updateDescription = e => {
    this.setState({ description: e.target.value });
  };

  updateAssignedTo = e => {
    this.setState({ assigned_to: e.target.value });
  };

  updateDueDate = e => {
    this.setState({ due_date: e.target.value });
  };

  updateCompleted = e => {
      this.setState({ completed: e.target.checked });
  };

  returnToList = () => {
    this.setState({ editList: false });
  };

  handleSubmit = () => {
    const { firebase } = this.props;
    let newItems = this.props.todoList.items;
    let item = {};
    const key = this.props.match.params.key;
    if (this.state.assigned_to === "" || this.state.description === "" || this.state.due_date === "" ){
      return;
    }
    if (this.props.match.params.key != this.props.todoList.items.length) {
      newItems[key].assigned_to = this.state.assigned_to;
      newItems[key].description = this.state.description;
      newItems[key].due_date = this.state.due_date;
      newItems[key].completed = this.state.completed;
    }
    else {
      item.assigned_to = this.state.assigned_to;
      item.description = this.state.description;
      item.due_date = this.state.due_date;
      item.completed = this.state.completed;
      item.key = this.props.match.params.key;
      newItems.push(item);
    }

    this.props.submitItemChange(this.props.todoList.id, newItems, firebase);
    this.setState({ editList: false });
  };

  render() {
    const todoList = this.props.todoList;
    const item = todoList.items[this.props.match.params.key];
    if (this.state.editList == false) {
      return <Redirect to={"/todoList/" + todoList.id} />;
    }
    return (      
      <div className="container white">
        <h5 className="grey-text text-darken-3">Edit Item</h5>
        <div class="input-field col s6">
          <input
            className="active"
            type="text"
            name="assigned_to"
            id="assigned_to"
            defaultValue={this.state.assigned_to}
            onChange={this.updateAssignedTo}
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
            defaultValue={this.state.description}
            onChange={this.updateDescription}
          />
          <label class="active" for="description">
            Description
          </label>
        </div>
        <div class="input-field col s6">
          <input
            class="datepicker"
            type="date"
            name="due_date"
            id="due_date"
            defaultValue={this.state.due_date}
            onChange={this.updateDueDate}
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
              defaultChecked={this.state.completed}
              onChange={this.updateCompleted}
            />
            <span>Completed</span>
          </label>
        </div>
        <div>
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={this.handleSubmit}
          >
            Submit
            <i class="material-icons right">send</i>
          </button>
          <a class="waves-effect waves-light btn" onClick={this.returnToList}>
            Cancel
          </a>
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
const mapDispatchToProps = (dispatch, newItems, firebase) => ({
  submitItemChange: (id, newItems, firebase) =>
    dispatch(submitItemChangeHandler(id, newItems, firebase))
});
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ItemEditScreen);
