import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { Redirect } from "react-router-dom";
import { firestoreConnect } from 'react-redux-firebase';

class ItemsList extends React.Component {
    state = {
        newElement: false,
    }
    handleNewElement = () => {
        this.setState({newElement: true});
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);

        if (this.state.newElement){
            return <Redirect to={"/todoList/" + todoList.id + "/items/" + todoList.items.length} />
        }
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} />
                    );})
                }
            <a class="btn-floating btn-large waves-effect waves-light red" id="addNewListButton" onClick={this.handleNewElement}><i class="material-icons">add</i></a>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);