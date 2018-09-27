import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Footer } from "mdbreact";
import api from "./utils/api";
import Auth from "./Auth";
import Home from "./Home";
import Discover from "./Discover";

import Navigation from "./Navigation";
import Profile from "./Profile";
import NotFound from "./NotFound";

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this._setUser(true),
      isOpen: false,
      list: [],
      number: 0
    };
    this.checkBackendFirst = this.checkBackendFirst.bind(this);
    this._handleNoteClick = this._handleNoteClick.bind(this);
    this.checkBackend = this.checkBackend.bind(this);
    this._setUser = this._setUser.bind(this);
    this._resetUser = this._resetUser.bind(this);
    this._toggle = this._toggle.bind(this);
  }

  checkBackendFirst() {

    // const oldList = this.state.list
    // console.log("oldlist1", oldList)
    // api
    //   .get(`/api/profile/user/notify`)
    //   .then(data => {
    //     this.setState({
    //       list: data,
    //       // number: 
    //     });
    //     // console.log("read", data.filter(read=true))

    //     console.log("list1", this.state.list);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
  checkBackend() {
    const oldList = this.state.list
    console.log("oldlist2", oldList)
    api
      .get(`/api/profile/user/notify`)
      .then(data => {
        this.setState({
          list: data,
        });
        if (oldList.length !== this.state.list.length) {
        const read = this.state.list.map(e => e.read)
        console.log(read)
        for (let i = 0; i < read.length; i++) {
          if (read[i] === false) {
            console.log("there is notification", i)
            this.setState({
              number: this.state.number+1})
          } else { console.log("no notification", i) }
        }}
        // if (oldList.length !== this.state.list.length) {
        //   console.log("WORKING")
        //   this.setState({
        //     number: this.state.number + (this.state.list.length - oldList.length)
        //   })
        // }
        // console.log("list2", this.state.list);


      })

      .catch(err => {
        console.log(err);
      });
  }

  _handleNoteClick(e) {
    this.setState({
      number: 0
    })
    api
      .post(`/api/profile/user/read/notify`)
      .then(data => {
        console.log("read notifications!")
      });

  }
  componentDidMount() {
    this.checkBackend();
    this._setUser();
  this.checkBackend();
  }
  _toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation
            user={this.state.user}
            open={this.state.isOpen}
            toggle={this._toggle}
            list={this.state.list}
            number={this.state.number}
            handleNoteClick={this._handleNoteClick}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  setUser={this._setUser}
                  user={this.state.user}
                  post={this.state.post}
                />
              )}
            />{" "}
            <Route
              exact
              path="/discover"
              render={() => (
                <Discover setUser={this._setUser} user={this.state.user} />
              )}
            />
            <Route
              exact
              path="/profile"
              render={() => (
                <Profile user={this.state.user} setUser={this._setUser} />
              )}
            />
            <Route
              exact
              path="/profile/:username"
              render={() => (
                <Profile user={this.state.user} setUser={this._setUser} />
              )}
            />
            <Route
              path="/auth"
              render={() => (
                <Auth setUser={this._setUser} resetUser={this._resetUser} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
          <footer>
            <div className="footer footer-copyright text-center py-3">
              <Container fluid>
                &copy; {new Date().getFullYear()} Copyright: Tim and Dalina
              </Container>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }

  _resetUser() {
    this.setState({
      user: null,
      list: [],
      number: 0
    });
    clearInterval(this.intervalId)
  }

  _setUser(init) {
    const token = localStorage.getItem("identity");
    if (token) {
      const decoded = jwtDecode(token);
      delete decoded.iat;
      if (init) return decoded;
      this.setState({ user: decoded });
      this.checkBackendFirst();
      this.intervalId = setInterval(() => {
        return this.checkBackend()
      }, 5000)
    } else {
      return null;
    }
  }
}

export default Application;
