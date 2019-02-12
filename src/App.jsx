import React, { Component } from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      currId:0,
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "glumpus"
        },
        {
          username: "Glorbus",
          content: "You cretin, you absolute buffoon. How would we see your marbles? This is a chatroom.",
          id: "doorf"
        },
        {
          username: "Glorbus",
          content: "I hope you're stricken with an incurable disease.",
          id: "gadoorf"
        }
      ]
    };
    this.getMessage= this.getMessage.bind(this);
    this.getUsername= this.getUsername.bind(this);

  }
  getMessage(event){
  if (event.key === 'Enter'){
    console.log(event.target.value)
    let newMessage= {id:this.state.currId, username:this.state.currentUser.name, content: event.target.value };
    const messages= this.state.messages.concat(newMessage);
    this.setState({messages: messages, currId: this.state.currId+1})

    }
  };
  getUsername(event){
      this.setState({currentUser:{name: event.target.value} })
    };

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: "doorbulon", username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
