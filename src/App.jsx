
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
    let sendData = {type:"newMessage", username: newMessage.username, content: newMessage.content}
    this.socket.send(JSON.stringify(sendData));
    event.target.value=''
    }
  };
  appendMessage(messageInfo){
    console.log(messageInfo)
    let newMessage={};

    switch(messageInfo.type){
      case "newMessage":
        newMessage.username = messageInfo.username; 
        newMessage.content = messageInfo.content;
        newMessage.key = messageInfo.id;
        newMessage.type = messageInfo.type;
          break;
      case "notification":
        newMessage.oldName = messageInfo.oldName;
        newMessage.newName = messageInfo.newName
        newMessage.key= messageInfo.id;
        newMessage.type = messageInfo.type;
          break;
    }

    console.log(newMessage)
    const messages= this.state.messages.concat(newMessage);
    this.setState({messages: messages})

  }
  getUsername(event){
    let sendData={}
    if (event.key === 'Enter'){
      let oldName= this.state.currentUser.name;
      let newName= event.target.value;
      sendData.type= "notification"; 
      sendData.oldName= oldName;
      sendData.newName= newName;
      console.log(oldName);
      console.log(newName)
      console.log("Senddata: " + sendData.oldName)
      this.socket.send(JSON.stringify(sendData));

      this.setState({currentUser:{name: newName} })
    };

  };

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws:0.0.0.0:3001"); 
    this.socket.onopen = () => {}
    this.socket.onmessage = (event)=>{
      console.log("received from server:" + event.data);
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
