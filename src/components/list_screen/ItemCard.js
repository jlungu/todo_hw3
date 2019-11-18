import React from "react";
import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { Button, Card, Row, Col } from "react-materialize";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { submitItemChangeHandler } from "../../store/database/asynchHandler";
import { NavLink, Redirect } from "react-router-dom";

class ItemCard extends React.Component {
  state = {
    refresh: false
  };
  componentDidMount = options => {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".fixed-action-btn");
      var instances = M.FloatingActionButton.init(elems, {
        direction: "left"
      });
    });
  };

  moveItemUp = () => {
    let items = this.props.todoList.items;
    const { firebase } = this.props;
    let index = this.props.item.key;

    if (index === 0) return;

    let item = items[index];
    let temp = items[index - 1];
    items[index - 1] = item;
    items[index] = temp;

    this.props.submitItemChange(this.props.todoList.id, items, firebase);
  };

  render() {
    const { item, todoList } = this.props;

    if (this.state.refresh) {
      this.props.history.push("/");
    }
    return (
      <div className="card z-depth-0 todo-list-link pink-lighten-3 red lighten-5 item_card">
        <div class="row">
          <Link to={"/todoList/" + todoList.id + "/items/" + item.key}>
            <div class="col s4">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">{item.description}</span>
                <span className="black-text">
                  Assigned To: {item.assigned_to}
                </span>
              </div>
            </div>
            <div class="col s2" id="item_card_due_date">
              {item.due_date}
            </div>
            <div class="col s2" id="item_card_completed">
              {item.completed ? "Completed" : "Incompleted"}
            </div>
          </Link>
          <Button floating fab={{}} className="floating_button" large>
            <Button floating className="red" />
            <Button floating className="yellow darken-1" />
            <Button floating className="green" />
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, id, items, firebase) => ({
  submitItemChange: (id, items, firebase) =>
    dispatch(submitItemChangeHandler(id, items, firebase))
});

export default compose(
  connect(null, mapDispatchToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ItemCard);
