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
    newItem: false,
    description: "",
    assigned_to: "",
    due_date: "",
    completed: false
  };

  componentDidMount() {
    this.setState({ editList: true });
    this.setState({ newItem: false });
    const auth = this.props.auth;
    if (!auth.uid) {
      return ;
    }
    this.setState({item: this.props.todoList.items[this.props.match.params.key],
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
          : false});
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
    console.log(this.props.todoList.items[this.props.match.params.key].completed)
  };

  returnToList = () => {
    this.setState({ editList: false });
  };

  handleSubmit = () => {
    const { firebase } = this.props;
    let newItems = this.props.todoList.items;
    let item = {};
    const key = this.props.match.params.key;
    if (
      document.getElementById("assigned_to").value === "" ||
      document.getElementById("description").value === "" ||
      document.getElementById("due_date").value === ""
    ) {
      return;
    }
    if (this.props.match.params.key != this.props.todoList.items.length) {
      newItems[key].assigned_to = this.state.assigned_to;
      newItems[key].description = this.state.description;
      newItems[key].due_date = this.state.due_date;
      newItems[key].completed = this.state.completed;
    } else {
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
    const auth = this.props.auth;
    if (!auth.uid) {
      return <Redirect to="/" />;
    }
    const todoList = this.props.todoList;
   
    const item = todoList.items[this.props.match.params.key];
    if (this.state.editList == false) {
      return <Redirect to={"/todoList/" + todoList.id} />;
    }
    return (
      <div className="container">
        <div className="card z-depth-1 todo-list-link pink-lighten-3 blue lighten-5">
          <div
            className="card z-depth-0 todo-list-link pink-lighten-3 blue"
            id="edit_header"
          >
            <div class="card-content white-text" id="the_id_thing">
              <span id="edit_item_header">Modify/Add Item</span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input
                className="active"
                type="text"
                name="assigned_to"
                id="assigned_to"
                defaultValue={this.state.assigned_to}
                onChange={this.updateAssignedTo}
                required
                aria-required="true"
                class="validate"
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
                required
                aria-required="true"
                class="validate"
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
                required
                aria-required="true"
                class="validate"
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
                  defaultChecked={ this.props.match.params.key != this.props.todoList.items.length
                    ? this.props.todoList.items[this.props.match.params.key].completed
                    : false}
                  onChange={this.updateCompleted}
                />
                <span>Completed</span>
              </label>
            </div>
          </div>
          <div class="my_buttons">
            <button
              class="btn-large waves-effect blue waves-light"
              id="submit"
              type="submit"
              name="action"
              onClick={this.handleSubmit}
            >
              Submit
              <i class="material-icons right">send</i>
            </button>
            <a
              class="waves-effect waves-light btn-large blue"
              id="cancel"
              onClick={this.returnToList}
            >
              <i class="material-icons right">close</i>
              Cancel
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList) todoList.id = id;

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
