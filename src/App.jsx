
import React, { Component } from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';


class App extends Component {
  constructor(props) {
    console.log('Connected to server.') 
  
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: []
    };

    this.getMessage= this.getMessage.bind(this);
    this.getUsername= this.getUsername.bind(this);
    this.appendMessage= this.appendMessage.bind(this);


  }
  getMessage(event){
  if (event.key === 'Enter'){
    let newMessage= {username:this.state.currentUser.name, content: event.target.value };
    let sendData = { username: newMessage.username, content: newMessage.content}
    this.socket.send(JSON.stringify(sendData));
    event.target.value=''
    }
  };
  appendMessage(messageInfo){
    console.log(messageInfo)
    let newMessage={username: messageInfo.username, content:messageInfo.content, key:messageInfo.id}
    console.log(newMessage)
    const messages= this.state.messages.concat(newMessage);
    this.setState({messages: messages})

  }
  getUsername(event){
      this.setState({currentUser:{name: event.target.value} })
    };

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws:0.0.0.0:3001"); 
    this.socket.onopen = () => {}
    this.socket.onmessage = (event)=>{
      console.log(event.data);
      this.appendMessage(JSON.parse(event.data));

    }
    };
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main>
          <MessageList messages={this.state.messages}/>
        </main>
        <Chatbar currentUser={this.state.currentUser} getMessage={this.getMessage} getUsername={this.getUsername} />
      </div>
    );
  }
};
export default App;
