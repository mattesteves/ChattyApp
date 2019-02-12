
import React, {Component} from 'react';
import Message from './Message.jsx';

module.exports = class MessageList extends Component {
  render(){
    return (
      <main className="messages">
      <Message />
      </main>

    )
  }
}