import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-1 todo-list-link orange lighten-5" onClick={this.props.updateFirstTodo.bind(this, todoList)}>
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;