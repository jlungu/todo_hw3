import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import ItemsList from "./ItemsList.js";
import { firestoreConnect } from "react-redux-firebase";
import { editNameHandler } from "../../store/database/asynchHandler";
import { editOwnerHandler } from "../../store/database/asynchHandler";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import DeleteListModal from "./DeleteListModal.js";

class ListScreen extends Component {
  state = {
    name: "",
    owner: ""
  };

  componentDidMount = options => {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems, options);
    });
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
    if (!todoList) return <React.Fragment />;

    return (
      <div className="container">
        <DeleteListModal id={this.props.todoList.id} />
        <div className="card z-depth-0 todo-list-link pink-lighten-3 green lighten-5">
          <div class="row">
            <h5 className="grey-text text-darken-3 col s3">My Todo-List</h5>
            <a
              data-target="modal1"
              class="btn-floating btn-large waves-effect waves-light green delete_but col s0 btn modal-trigger"
            >
              <i class="material-icons">delete</i>
            </a>
          </div>

          <div class="row">
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
            <div className="input-field col s6 main_input">
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
          </div>
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
  if (todoList) todoList.id = id;

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
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ListScreen);
