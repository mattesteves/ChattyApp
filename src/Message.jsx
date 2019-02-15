import React, { Component } from 'react';

module.exports = class Message extends Component {
  render() {
    let messageContent = this.props.content;
    switch (this.props.type) {
      case 'newMessage':
        // RegEx to check for image URLs
        let imgPlace;
        if (
          /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(
            messageContent
          ) === true
        ) {
          let imgUrl = messageContent.match(
            /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
          )[0];
          console.log(imgUrl);

          imgPlace = (
            <div>
              <br />
              <img src={imgUrl} />
            </div>
          );
          // console.log(imgPlace);
          messageContent = messageContent.replace(imgUrl, '');
          // messageCotent += imgPlace;
        }
        function test() {
          return 'string';
        }

        return (
          <div>
            <div className="message">
              <span className={`${this.props.color}`}>{this.props.name}</span>
              <span className="message-content">
                {messageContent}
                {imgPlace}
              </span>
            </div>
          </div>
        );
        break;

      case 'notification':
        return (
          <div className="message system">
            {this.props.oldName} changed their name to {this.props.newName}.
          </div>
        );

        break;
    }
  }
};
