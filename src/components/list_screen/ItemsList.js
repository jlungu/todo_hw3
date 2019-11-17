import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ItemCard from "./ItemCard";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

const SortingCriteria = {
  TASK_INCREASING: "TASK_INCREASING",
  TASK_DECREASING: "TASK_DECREASING",
  DUE_DATE_INCREASING: "DUE_DATE_INCREASING",
  DUE_DATE_DECREASING: "DUE_DATE_DECREASING",
  STATUS_INCREASING: "STATUS_INCREASING",
  STATUS_DECREASING: "STATUS_DECREASING"
};

class ItemsList extends React.Component {
  state = {
    newElement: false,
    todoList: this.props.todoList.items,
    sortingCriteria: null
  };
  handleNewElement = () => {
    this.setState({ newElement: true });
  };

  sortByTask = () => {
    if (this.state.sortingCriteria === SortingCriteria.TASK_INCREASING)
      this.setState(
        { sortingCriteria: SortingCriteria.TASK_DECREASING },
        () => {
          this.goSortItems();
        }
      );
    else if (this.state.sortingCriteria === SortingCriteria.TASK_DECREASING)
      this.setState(
        { sortingCriteria: SortingCriteria.TASK_INCREASING },
        () => {
          this.goSortItems();
        }
      );
    else
      this.setState(
        { sortingCriteria: SortingCriteria.TASK_INCREASING },
        () => {
          this.goSortItems();
        }
      );
  };

  sortByDueDate = () => {
    if (this.state.sortingCriteria === SortingCriteria.DUE_DATE_INCREASING)
      this.setState(
        { sortingCriteria: SortingCriteria.DUE_DATE_DECREASING },
        () => {
          this.goSortItems();
        }
      );
    else if (this.state.sortingCriteria === SortingCriteria.DUE_DATE_DECREASING)
      this.setState(
        { sortingCriteria: SortingCriteria.DUE_DATE_INCREASING },
        () => {
          this.goSortItems();
        }
      );
    else
      this.setState(
        { sortingCriteria: SortingCriteria.DUE_DATE_INCREASING },
        () => {
          this.goSortItems();
        }
      );
  };

  sortByStatus = () => {
    if (this.state.sortingCriteria === SortingCriteria.STATUS_INCREASING)
      this.setState(
        { sortingCriteria: SortingCriteria.STATUS_DECREASING },
        () => {
          this.goSortItems();
        }
      );
    else if (this.state.sortingCriteria === SortingCriteria.STATUS_DECREASING)
      this.setState(
        { sortingCriteria: SortingCriteria.STATUS_INCREASING },
        () => {
          this.goSortItems();
        }
      );
    else
      this.setState(
        { sortingCriteria: SortingCriteria.STATUS_INCREASING },
        () => {
          this.goSortItems();
        }
      );
  };

  goSortItems = () => {
    this.setState({todoList: this.state.todoList.sort(this.compare.bind(this))});
    this.render();
    console.log(this.state.todoList)
  };

  compare(item1, item2) {
    // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
    if (
      this.state.sortingCriteria === SortingCriteria.TASK_DECREASING ||
      this.state.sortingCriteria === SortingCriteria.STATUS_DECREASING ||
      this.state.sortingCriteria === SortingCriteria.DUE_DATE_DECREASING
    ) {
      let temp = item1;
      item1 = item2;
      item2 = temp;
    }
    // SORT BY ITEM DESCRIPTION
    if (
      this.state.sortingCriteria === SortingCriteria.TASK_INCREASING ||
      this.state.sortingCriteria === SortingCriteria.TASK_DECREASING
    ) {
      if (item1.description < item2.description) return -1;
      else if (item1.description > item2.description) return 1;
      else return 0;
    }
    // SORT BY COMPLETED
    else if (
      this.state.sortingCriteria === SortingCriteria.STATUS_INCREASING ||
      this.state.sortingCriteria === SortingCriteria.STATUS_DECREASING
    ) {
      if (item1.completed < item2.completed) return -1;
      else if (item1.completed > item2.completed) return 1;
      else return 0;
    }
    //SORT BY DUE DATE
    else {
      if (item1.due_date < item2.due_Date) return -1;
      else if (item1.due_date > item2.due_date) return 1;
      else return 0;
    }
  }

  render() {
    const todoList = this.props.todoList;
    const items = this.state.todoList;
    console.log("ItemsList: todoList.id " + todoList.id);

    if (this.state.newElement) {
      return (
        <Redirect
          to={"/todoList/" + todoList.id + "/items/" + todoList.items.length}
        />
      );
    }
    return (
      <div className="todo-lists section">
        <nav>
          <div class="nav-wrapper">
            <ul id="nav-mobile" class="center hide-on-med-and-down">
              <li>
                <span id="header_type" onClick={this.sortByTask}>
                  Task
                </span>
              </li>
              <li>
              <span id="header_type" onClick={this.sortByDueDate}>
                  Due Date
                </span>
              </li>
              <li>
              <span id="header_type" onClick={this.sortByStatus}>
                  Completed
                </span>
              </li>
            </ul>
          </div>
        </nav>

        {items &&
          items.map(function(item) {
            item.id = item.key;
            return <ItemCard todoList={todoList} item={item} />;
          })}
        <a
          class="btn-floating btn-large waves-effect waves-light red"
          id="addNewListButton"
          onClick={this.handleNewElement}
        >
          <i class="material-icons">add</i>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const todoList = ownProps.todoList;
  return {
    todoList,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ItemsList);
