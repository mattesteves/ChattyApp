
import React, {Component} from 'react';



module.exports = class Message extends Component {

  render(){
    return(
      <div>
        <div className="message">
          <span className="message-username">{this.props.name}</span>
          <span className="message-content">{this.props.content}</span>
        </div>

      </div>
      )
  }
}