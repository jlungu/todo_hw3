import React, { Component } from "react";
import M from "materialize-css";
import { Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { deleteListHandler } from "../../store/database/asynchHandler";

class DeleteListModal extends Component {
  state = {
    deletedList: false,
  }
    componentDidMount() {
        M.Modal.init(this.Modal);
      }

      handleDelete = () => {
        console.log(this.props.id);
        this.setState({deletedList: true});
        this.props.deleteList(this.props.id, this.props.firebase);
      }
      render() {
        if (this.state.deletedList){
          return <Redirect to="/" />;
        }
        return (
          
          <div>
            <div
              ref={Modal => {
                this.Modal = Modal;
              }}
              id="modal1"
              className="modal"
            >
              <div className="modal-content">
                <h4>Delete List</h4>
                <p>Are you sure you want to delete this list? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <a className="modal-close waves-effect waves-red btn-flat">
                  No I Dont!
                </a>
                <a className="modal-close waves-effect waves-green btn-flat" onClick={this.handleDelete}>
                   Yes, Delete It!
                </a>
              </div>
            </div>
          </div>
        );
      }
    }

    const mapStateToProps = (state) => {
      const { todoLists } = state.firestore.data;
    
      return {
        auth: state.firebase.auth
      };
    };
    
    const mapDispatchToProps = (dispatch, id) => ({
      deleteList: (id, firebase) =>
      dispatch(deleteListHandler(id, firebase)),
    });
    
    export default compose(
      connect(mapStateToProps, mapDispatchToProps),
      firestoreConnect([{ collection: "todoLists" }])
    )(DeleteListModal);

    