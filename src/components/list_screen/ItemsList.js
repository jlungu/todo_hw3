import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ItemCard from "./ItemCard";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { submitItemChangeHandler } from "../../store/database/asynchHandler";

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
    todoList: this.props.todoList,
    sortingCriteria: null,
    refresh: false,
  };

  handleNewElement = () => {
    this.setState({ newElement: true });
  };

  componentDidMount = () => {
    this.resetKeys();
  }

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
    this.state.todoList.items.sort(this.compare.bind(this));
    this.resetKeys();
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

  refreshList = () => {
    this.forceUpdate();
  }

  moveItemUp = (item) => {
    console.log(this.state.todoList.items)
    let todo = this.state.todoList;
    let index = item.key;

    if (index === 0) return;

    let temp = todo.items[index - 1];
    todo.items[index - 1] = item;
    todo.items[index] = temp;

    this.setState({todoList: todo});
    this.resetKeys();
    console.log(todo)
    
  };

  moveItemDown = (item) => {
    let todo = this.state.todoList;
    let index = item.key;

    if (index === todo.items.length-1) return;

    let temp = todo.items[index + 1];
    todo.items[index + 1] = item;
    todo.items[index] = temp;

    this.setState({todoList: todo});
    this.resetKeys();
  };

  deleteItem = (item) => {
    let items = this.props.todoList.items;

    this.state.todoList.items = [
      ...this.state.todoList.items.filter(i => i.key !== item.key)
    ];

    //this.setState({todoList: items});
    this.resetKeys();
  };

  resetKeys = () => {
    for (let i = 0; i < this.state.todoList.items.length; i++) {
      this.state.todoList.items[i].key = i;
    }
    const { firebase } = this.props;
    this.props.submitItemChange(this.state.todoList.id, this.state.todoList.items, firebase);
  };

  render() {
    const todoList = this.state.todoList;
    console.log("ItemsList: todoList.id " + todoList.id);

    if (this.state.newElement) {
      return (
        <Redirect
          to={"/todoList/" + this.props.todoList.id + "/items/" + this.props.todoList.items.length}
        />
      );
    }

    if (this.state.refresh){
      return <Redirect to={'/todoList/' + this.props.todoList.id} key={this.props.todoList.id}/>;
    }

    return (
      
      <div className="todo-lists section">
        <nav>
          <div class="nav-wrapper red">
            <ul id="nav-mobile" class="center hide-on-med-and-down">
              <li>
                <span  id="header_type" onClick={this.sortByTask}>
                  Task
                </span>
              </li>
              <li>
              <span class="header" id="header_type_due" onClick={this.sortByDueDate}>
                  Due Date
                </span>
              </li>
              <li>
              <span class="header" id="header_type_complete" onClick={this.sortByStatus}>
                  Completed
                </span>
              </li>
            </ul>
          </div>
        </nav>

        {this.state.todoList.items.map((todoItem)=>(
            <ItemCard todoList={this.state.todoList} item={todoItem} moveItemUp={this.moveItemUp} moveItemDown={this.moveItemDown} deleteItem={this.deleteItem}/>
          ))}
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

const mapDispatchToProps = (dispatch, id, newItems, firebase) => ({
  submitItemChange: (id, newItems, firebase) =>
    dispatch(submitItemChangeHandler(id, newItems, firebase))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ItemsList);
