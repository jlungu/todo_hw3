import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import TodoListCard from "./TodoListCard";

class TodoListLinks extends React.Component {
  state = {
    todoLists: this.props.todoLists,
    firstTodo: null,
  };

  componentDidMount = () => {
      this.setState({todoLists: this.props.todoLists})
  }


  findLists = () => {
    if (this.props.firstTodo === null)
        return;

    const todoLists = this.props.todoLists;
    //console.log(todoLists);
    let index = -1;
    for (let i = 0; i < todoLists.length; i++) {
        //console.log(todoLists[i] + " " + this.props.firstTodo)
      if (todoLists[i] === this.props.firstTodo) {
        index = i;
        break;
      }
    }

    let temp = todoLists[0];
    todoLists[0] = todoLists[index];
    todoLists[index] = temp;

    this.setState({todoLists: todoLists});
    
    //console.log(index);
  };

  updateFirstTodo = (newTodo) => {
    this.setState({firstTodo: newTodo});
        console.log(newTodo.id + " here!!!")
  }

  render() {
    let todoLists = {};
    console.log(this.props.todoLists);
    if (this.props.firstTodo === null)
        todoLists = this.props.todoLists;
    else{
        todoLists = this.state.todoLists;
    }
    this.findLists();

    return (
      <div className="todo-lists section">
        {todoLists &&
          todoLists.map(todoList => (
            <Link to={"/todoList/" + todoList.id} key={todoList.id}>
              <TodoListCard todoList={todoList} updateFirstTodo={this.props.updateFirstTodo}/>
            </Link>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("in map state to props")
  return {
    todoLists: state.firestore.ordered.todoLists,
    auth: state.firebase.auth
  };
};

export default compose(connect(mapStateToProps))(TodoListLinks);
