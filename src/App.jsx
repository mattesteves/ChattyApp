
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
      currId:0,
      messages: []
    };

    this.getMessage= this.getMessage.bind(this);
    this.getUsername= this.getUsername.bind(this);


  }
  getMessage(event){
  if (event.key === 'Enter'){
    console.log(event.target.value)
    let newMessage= {id:this.state.currId, username:this.state.currentUser.name, content: event.target.value };
    let sendData = { username: newMessage.username, content: newMessage.content}
    this.socket.send(JSON.stringify(sendData));
    const messages= this.state.messages.concat(newMessage);
    this.setState({messages: messages})

    }
  };
  getUsername(event){
      this.setState({currentUser:{name: event.target.value} })
    };

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws:0.0.0.0:3001"); 
    this.socket.onopen = () => {}
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
