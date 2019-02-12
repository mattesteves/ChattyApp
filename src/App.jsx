import React, { Component } from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Jombus" },
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

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main>
          <MessageList messages={this.state.messages}/>
        </main>
        <Chatbar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
