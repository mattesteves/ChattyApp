
import React, { Component } from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';


class App extends Component {
  constructor(props) {
    console.log('Connected to server.') 
  
    super(props);
    this.state = {
      currentUser: {
         name: 'Anonymous',
        },
        color:'',
      messages: [],
      online: 0
    };

    this.getMessage= this.getMessage.bind(this);
    this.getUsername= this.getUsername.bind(this);
    this.appendMessage= this.appendMessage.bind(this);
    this.userMod= this.userMod.bind(this);


  }
  getMessage(event){
  if (event.key === 'Enter'){
    let newMessage= {username:this.state.currentUser.name, content: event.target.value, color: this.state.color };
    let sendData = {type:"newMessage", username: newMessage.username, content: newMessage.content, color: newMessage.color}
    this.socket.send(JSON.stringify(sendData));
    event.target.value=''
    }
  };

  userMod(action, color){
    this.setState({online: action})
    if (!color == this.state.color){
      this.setState({color: color})
      console.log(color)
    }
  };

  appendMessage(messageInfo){
    let newMessage={};

    switch(messageInfo.type){
      case "newMessage":
        newMessage.username = messageInfo.username; 
        newMessage.content = messageInfo.content;
        newMessage.key = messageInfo.id;
        newMessage.type = messageInfo.type;
        newMessage.color= messageInfo.color
          break;
      case "notification":
        newMessage.oldName = messageInfo.oldName;
        newMessage.newName = messageInfo.newName
        newMessage.key= messageInfo.id;
        newMessage.type = messageInfo.type;
          break;
    }

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
      this.socket.send(JSON.stringify(sendData));

      this.setState({currentUser:{name: newName} })
    };

  };

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws:0.0.0.0:3001"); 
    this.socket.onopen = () => {}
    this.socket.onmessage = (event)=>{
      let data= JSON.parse(event.data);
      let appendo= this.appendMessage;
      let usermod= this.userMod;
      if (data.type == "usercount"){
        usermod(data.userNum, data.colorNum)

      } else{
      appendo(data);
      }
    }
  };
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="online">
            <h2>Users online: {this.state.online}</h2>
          </span>
        </nav>
        <main>
          <MessageList 
            messages={this.state.messages}
            color={this.state.color}
          />
        </main>
        <Chatbar currentUser={this.state.currentUser} 
          getMessage={this.getMessage} 
          getUsername={this.getUsername} 
        />
      </div>
    );
  }
};

export default App;
