
import React, {Component} from 'react';
import Message from './Message.jsx';

module.exports = class MessageList extends Component {
  render(){
    const messages = this.props.messages.map(message => (
     <Message name={message.username} content={message.content} key={message.id} />
      ))
      
     
    return (<ul>
      {messages}
      </ul>
    )
  }
}