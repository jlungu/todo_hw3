import React from "react";
import { Link } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'


class ItemCard extends React.Component {

  componentDidMount = (options) => {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
      });
    });
          
  }
  render() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
      });
    });
          
    const { item, todoList } = this.props;
    return (
      <Link to={"/todoList/" + todoList.id + "/items/" + item.key}>
        <div className="card z-depth-0 todo-list-link pink-lighten-3">
          <div class="row">
            <div class="col s3">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">{item.description}</span>
                <span className="black-text">
                  Assigned To: {item.assigned_to}
                </span>
              </div>
            </div>
            <div class="col s3" id="item_card_due_date">{item.due_date}</div>
            <div class="col s3" id="item_card_completed">{item.completed? "Completed": "Incompleted"}</div>

      {document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left'
  });
})}    
<div class="fixed-action-btn floating_button col s3 ">
  <a class="btn-floating btn-large red">
    <i class="large material-icons">mode_edit</i>
  </a>
  <ul>
    <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
    <li>><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
  </ul>
</div>
      
            </div>
          </div>
      </Link>
    );
  }
}
export default ItemCard;
