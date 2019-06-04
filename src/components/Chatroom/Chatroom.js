import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import "../Chatroom/Chatroom.css";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
class Chatroom extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      message: [],
      username: false
    };
  }
  componentDidMount() {
    this.initSocket();
    if (this.props.user.username) {
      this.setState({ username: true });
    }
  }

  initSocket = () => {
    const socket = io("http://172.31.99.90:7777/chat", { secure: true });
    // const socket = io("http://192.168.254.58:7777/chat");
    // const socket = io("http://192.241.133.39:7777/chat", { secure: true });
    socket.on("connected", msg => {
      console.log(msg);
    });
    socket.emit("joinRoom", this.props.match.params.room);
    socket.on("err", err => console.log(err));
    socket.on("success", res => console.log(res));
    socket.on("newUser", res => console.log(res));
    socket.on("msg", res => {
      this.setState({ messages: [...this.state.messages, res.data] });
    });
  };
  sendMessage = () => {
    const socket = io("http://172.31.99.90:7777/chat", { secure: true });
    // const socket = io("http://192.168.254.58:7777/chat");
    // const socket = io("http://192.241.133.39:7777/chat", { secure: true });
    socket.emit("newMsg", {
      room: this.props.match.params.room,
      data: {
        user: this.props.user.username,
        message: this.state.message
      }
    });
    this.setState({ message: "" });
  };

  render() {
    // if (!this.props.rooms.includes(this.props.match.params.room)) {
    //   return <Redirect to="/" />;
    // } else {
    return (
      <div>
        <Navbar />
        <div className="chatRoomForm">
          {/* <div className="msgForm"> */}
          {this.state.messages.map((message, index) => {
            return (
              <div className="messages" key={index}>
                <p className="userMessage">
                  {message.user}: {message.message}
                </p>
              </div>
            );
          })}
          {/* </div> */}
          <div className="input-Btn">
            <input
              className="inputMessage"
              type="text"
              placeholder="Message"
              value={this.state.message}
              onChange={ev => this.setState({ message: ev.target.value })}
            />
            <br />
            <button className="sendBtn" onClick={this.sendMessage}>
              <i class="far fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    rooms: reduxState.rooms
  };
};

export default connect(mapStateToProps)(Chatroom);
