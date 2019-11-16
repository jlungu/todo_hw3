import React from 'react';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
    render() {
        const { item, todoList } = this.props;
        return (
            <Link to={"/todoList/" + todoList.id + "/items/" + item.key}>
                <div className="card z-depth-0 todo-list-link pink-lighten-3"></div>
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                    <span className="black-text">Assigned To: {item.assigned_to}</span>
                </div>
                <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <span className="card-title">{item.due_date}</span>
                </div>
            </div>
            </Link>
        );
    }
}
export default ItemCard;