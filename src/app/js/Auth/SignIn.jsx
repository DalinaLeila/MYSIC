import React from "react";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  componentDidMount() {
    this.props.handleInputChange("email", "");
    this.props.handleInputChange("password", "");
  }

  render() {
    return (
      <div className="container">
        <div className="flex-auth">
          <div className="container-auth">
            <h1>Sign In</h1>
            <input
              type="text"
              value={this.props.username}
              onChange={evt =>
                this.props.handleInputChange("username", evt.target.value)
              }
              className="input"
              placeholder="Username"
            />
            <br />
            <br />
            <input
              type="password"
              value={this.props.password}
              onChange={evt =>
                this.props.handleInputChange("password", evt.target.value)
              }
              className="input"
              placeholder="Password"
            />
            <br />
            <br />
            <button className="button" onClick={() => this.props.sign("in")}>
              Sign In
            </button>
            <p>{this.props.error}</p>
            <p className="auth-quest">
              Don't have an account yet?{" "}
              <Link className="link" to="/auth/sign-up">
                Sign up{" "}
              </Link>
              instead!
            </p>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default SignIn;
