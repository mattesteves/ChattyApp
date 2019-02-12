import React, {Component} from 'react';

module.exports = class Chatbar extends Component {
  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder= {this.props.currentUser.name} onKeyUp={this.props.getUsername} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="inputMessage" onKeyPress= {this.props.getMessage} />
      </footer>
    )
  }
}
