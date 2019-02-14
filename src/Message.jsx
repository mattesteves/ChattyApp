
import React, {Component} from 'react';

module.exports = class Message extends Component {
  
  render(){

    console.log(this.props)
  switch(this.props.type){
    case "newMessage":
      return(
        <div>
          <div className="message">
            <span className={`${this.props.color}`} >{this.props.name}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        </div>
      )
      break;

    case "notification":
      return(
        <div className="message system">
          {this.props.oldName} changed their name to {this.props.newName}. 
        </div>);
      
      break;

    }
  }
}