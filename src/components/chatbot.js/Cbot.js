import React, { Component } from "react";
import axios from "axios";

export default class Cbot extends Component {
  state = {
    chat: [],
    message: "",
  };

  handleChange = (e) => {
    console.log("input change", e.target.value);
    this.setState({ message: e.target.value });
  };
  handleSend = () => {
    if (this.state.message == "") {
      console.log("saisir votre messafe");
    } else {
      axios
        .post("http://127.0.0.1:5000/predict", { message: this.state.message })
        .then((res) => {
          let ch = this.state.chat;
          ch.push({ from: "Visitor", message: this.state.message });
          ch.push({ from: "Aajib", message: res.data.answer });

          this.setState({ chat: ch, message: "" });
          console.log("affichage", this.state);
        })
        .catch((err) => {
          console.log(err);
        });
    
    }
  };
  render() {
    return (
      <div id="c">
        <div className="wwrapper">
          <div className="main">
            <div className="card-header">
              <h6 className="card-title">
                <p>Chat With CrazyBoot</p>
              </h6>
            </div>

            <div className="px-2 scroll">
              {this.state.chat.map((message) => {
                console.log("maping", message.message);

                if (message.from == "Aajib") {
                  return (
                    <div className="d-flex align-items-center">
                      <div className="text-left pr-1">
                        <img
                          src="https://img.icons8.com/color/40/000000/guest-female.png"
                          width="30"
                          className="img1"
                        />
                      </div>
                      <div className="pr-2 pl-1">
                        {" "}
                        <span className="name">{message.from}</span>
                        <p
                          className="msg"
                          style={{ backgroundColor: "lightblue" }}
                        >
                          {" "}
                          {message.message}
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="d-flex align-items-center text-right justify-content-end ">
                      <div className="pr-2">
                        {" "}
                        <span className="name">User</span>
                        <p className="msg"> {message.message}</p>{" "}
                      </div>
                      <div>
                        {/* <img src="https://i.imgur.com/HpF4BFG.jpg" width="30" className="img1" />  */}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <nav className="navbar bg-white navbar-expand-sm d-flex justify-content-between">
              {" "}
              <input
                type="text"
                name="message"
                onChange={(e) => this.handleChange(e)}
                value={this.state.message}
                className="form-control"
                placeholder="Type a message..."
              />
              <div className="icondiv d-flex justify-content-end align-content-center text-center ml-2">
                {" "}
                <i
                  onClick={() => this.handleSend()}
                  className="fa fa-arrow-circle-right icon2"
                ></i>
              </div>
            </nav>
            {/* <button className="primary" onClick={()=>this.handleSend()} >send   </button> */}
          </div>
        </div>
      </div>
    );
  }
}
