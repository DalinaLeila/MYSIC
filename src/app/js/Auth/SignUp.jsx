import React from "react";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  componentDidMount() {
    this.props.handleInputChange("email", "");
    this.props.handleInputChange("password", "");
    this.props.handleInputChange("username", "");
  }

  render() {
    return (
      <div className="container">
        <div className="flex-auth">
          <div className="container-auth">
            <h1>Sign Up</h1>
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
              type="email"
              value={this.props.email}
              onChange={evt =>
                this.props.handleInputChange("email", evt.target.value)
              }
              className="input"
              placeholder="E-Mail"
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
            <input
              type="file"
              value={this.props.picture}
              onChange={evt =>
                this.props.handleInputChange("picture", evt.target.files[0])
              }
              className="input"
              placeholder="Profile Picture"
            />
            <br />
            <br />
            <button className="button" onClick={() => this.props.sign("up")}>
              Sign Up
            </button>

            <p>{this.props.error}</p>
            <p className="auth-quest">
              Do you have an account already?{" "}
              <Link className="link" to="/auth/sign-in">
                Sign in{" "}
              </Link>{" "}
              instead!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
