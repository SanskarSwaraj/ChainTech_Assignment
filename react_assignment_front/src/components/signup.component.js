import React, { Component } from 'react'

export default class SignUp extends Component {
  constructor(props){
    super(props);
    // Initialize state to hold user data
    this.state={
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
    // Bind handleSubmit function to the class instance
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Function to handle form submission
  handleSubmit(e){
    e.preventDefault();
    // Destructure user data from state
    const { fname, lname, email, password } = this.state;
    console.log(fname,lname,email,password); // Log user data
    // Make a POST request to register endpoint with user data
    fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // Request body contains first name, last name, email, and password
        body: JSON.stringify({
          fname,
          email,
          lname,
          password,
        }),
      })
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data,"userRegister"); // Log response data
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        {/* Input field for first name */}
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e)=> this.setState({fname: e.target.value})}
          />
        </div>

        {/* Input field for last name */}
        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e)=> this.setState({lname: e.target.value})}
          />
        </div>

        {/* Input field for email */}
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=> this.setState({email: e.target.value})}
          />
        </div>

        {/* Input field for password */}
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=> this.setState({password: e.target.value})}
          />
        </div>

        {/* Submit button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        
        {/* Link to Sign In page */}
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}
